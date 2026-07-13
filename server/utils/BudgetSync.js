import Budget from "../models/BudgetSchema.js";
import Transaction from "../models/TransactionSchema.js";
import { getPeriodEnd } from "./BudgetPeriod.js";

export const applyBudgetDelta = async (
  { userId, categoryId, transactionDate, type },
  delta,
  session,
) => {
  if (type !== "expense" || !delta) return;

  const txDate = new Date(transactionDate);

  const candidateBudgets = await Budget.find({
    userId,
    categoryIds: categoryId,
    startDate: { $lte: txDate },
  }).session(session);

  const affectedIds = candidateBudgets
    .filter((b) => txDate < getPeriodEnd(b.startDate, b.period))
    .map((b) => b._id);

  if (affectedIds.length === 0) return;

  const safeDelta = Math.round(delta * 100) / 100;

  await Budget.updateMany(
    { _id: { $in: affectedIds } },
    { $inc: { spent: safeDelta } },
    { session },
  );
};

export const syncBudgetsOnCreate = (tx, session) =>
  applyBudgetDelta(tx, tx.amount, session);

export const syncBudgetsOnDelete = (tx, session) =>
  applyBudgetDelta(tx, -tx.amount, session);

export const syncBudgetsOnUpdate = async (
  originalTx,
  updatedFields,
  session,
) => {
  const oldSnapshot = {
    userId: originalTx.userId,
    categoryId: originalTx.categoryId,
    transactionDate: originalTx.transactionDate,
    type: originalTx.type,
    amount: originalTx.amount,
  };

  const newSnapshot = {
    userId: originalTx.userId,
    categoryId: updatedFields.categoryId ?? originalTx.categoryId,
    transactionDate:
      updatedFields.transactionDate ?? originalTx.transactionDate,
    type: updatedFields.type ?? originalTx.type,
    amount:
      updatedFields.amount !== undefined
        ? Number(updatedFields.amount)
        : originalTx.amount,
  };

  await syncBudgetsOnDelete(oldSnapshot, session);
  await syncBudgetsOnCreate(newSnapshot, session);
};

export const reconcileBudget = async (budget) => {
  const periodEnd = getPeriodEnd(budget.startDate, budget.period);

  const result = await Transaction.aggregate([
    {
      $match: {
        userId: budget.userId,
        categoryId: { $in: budget.categoryIds },
        type: "expense",
        transactionDate: { $gte: budget.startDate, $lt: periodEnd },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const trueSpent = Math.round((result[0]?.total || 0) * 100) / 100;

  await Budget.findByIdAndUpdate(budget._id, {
    spent: trueSpent,
    lastReconciledAt: new Date(),
  });

  return trueSpent;
};

export const reconcileAllBudgets = async (userId = null) => {
  const filter = userId ? { userId } : {};
  const budgets = await Budget.find(filter);
  for (const budget of budgets) {
    await reconcileBudget(budget);
  }
  return budgets.length;
};

export const getCategoryConflicts = async (
  userId,
  categoryIds,
  period,
  startDate,
  excludeBudgetId = null,
) => {
  const newStart = new Date(startDate);
  const newEnd = getPeriodEnd(newStart, period);

  const filter = {
    userId,
    categoryIds: { $in: categoryIds },
    startDate: { $lt: newEnd },
  };

  if (excludeBudgetId) {
    filter._id = { $ne: excludeBudgetId };
  }

  const candidateBudgets = await Budget.find(filter).populate(
    "categoryIds",
    "name",
  );

  const conflicts = [];

  const overlappingBudgets = candidateBudgets.filter((b) => {
    const existingEnd = getPeriodEnd(b.startDate, b.period);
    return existingEnd > newStart;
  });

  overlappingBudgets.forEach((budget) => {
    budget.categoryIds.forEach((cat) => {
      if (categoryIds.includes(cat._id.toString())) {
        conflicts.push({
          categoryId: cat._id.toString(),
          categoryName: cat.name,
          budgetId: budget._id.toString(),
          budgetName: budget.name,
        });
      }
    });
  });

  return conflicts;
};
