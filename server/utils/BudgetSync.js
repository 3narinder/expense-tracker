import Budget from "../models/BudgetSchema.js";
import Transaction from "../models/TransactionSchema.js";
import { isDateWithinPeriod, getPeriodEnd } from "./BudgetPeriod.js";

export const applyBudgetDelta = async (
  { userId, categoryId, transactionDate, type },
  delta,
  session,
) => {
  if (type !== "expense" || !delta) return;

  const candidateBudgets = await Budget.find({
    userId,
    categoryIds: categoryId,
  }).session(session);

  const affected = candidateBudgets.filter((b) =>
    isDateWithinPeriod(transactionDate, b.startDate, b.period),
  );

  if (affected.length === 0) return;

  await Budget.updateMany(
    { _id: { $in: affected.map((b) => b._id) } },
    // $inc with a floor of 0 isn't atomic in a single update, so clamp on
    // read (reconciliation) rather than trying to prevent small negative
    // drift here — an update or delete that removes more than was ever
    // added (e.g. after a manual DB edit) is a signal to re-reconcile, not
    // something to mask.
    { $inc: { spent: delta } },
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

  const trueSpent = result[0]?.total || 0;

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
