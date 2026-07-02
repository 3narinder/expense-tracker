import mongoose from "mongoose";
import Budget from "../models/BudgetSchema.js";
import Category from "../models/CategorySchema.js";
import { reconcileBudget } from "../utils/budgetSync.js";
import { getPeriodEnd } from "../utils/budgetPeriod.js";

const findOverlappingBudget = async (
  { userId, categoryIds, period, startDate },
  excludeBudgetId = null,
) => {
  const periodEnd = getPeriodEnd(startDate, period);
  const filter = {
    userId,
    categoryIds: { $in: categoryIds },
    period,
    // overlap test: existing.startDate < newEnd AND existing.periodEnd > newStart
    startDate: { $lt: periodEnd },
  };
  if (excludeBudgetId) filter._id = { $ne: excludeBudgetId };

  const candidates = await Budget.find(filter);
  return candidates.find(
    (b) => getPeriodEnd(b.startDate, b.period) > new Date(startDate),
  );
};

//* @desc    List budgets for the current user, with live spent/remaining
//* @route   GET /api/budgets
export const getBudgets = async (req, res) => {
  try {
    const userId = req.user.id;

    const budgets = await Budget.find({ userId })
      .populate("categoryIds", "name icon color")
      .sort({ startDate: -1 });

    const formatted = budgets.map((b) => ({
      id: b._id,
      categoryIds: b.categoryIds,
      amount: b.amount,
      spent: b.spent,
      remaining: b.amount - b.spent, // can go negative when over budget — surfaced as-is
      percentUsed: b.amount > 0 ? Math.round((b.spent / b.amount) * 100) : 0,
      period: b.period,
      startDate: b.startDate,
      periodEnd: getPeriodEnd(b.startDate, b.period),
      alertThreshold: b.alertThreshold,
      isAlertSent: b.isAlertSent,
      lastReconciledAt: b.lastReconciledAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching budgets", error: error.message });
  }
};

//* @desc    Get a single budget, force-reconciled against real transactions
//* @route   GET /api/budgets/:id
export const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const budget = await Budget.findOne({ _id: id, userId }).populate(
      "categoryIds",
      "name icon color",
    );
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    const trueSpent = await reconcileBudget(budget);

    res.status(200).json({
      id: budget._id,
      categoryIds: budget.categoryIds,
      amount: budget.amount,
      spent: trueSpent,
      remaining: budget.amount - trueSpent,
      percentUsed:
        budget.amount > 0 ? Math.round((trueSpent / budget.amount) * 100) : 0,
      period: budget.period,
      startDate: budget.startDate,
      periodEnd: getPeriodEnd(budget.startDate, budget.period),
      alertThreshold: budget.alertThreshold,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching budget", error: error.message });
  }
};

//* @desc    Create a multi-category budget
//* @route   POST /api/budgets
export const createBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryIds, amount, period, startDate, alertThreshold } = req.body;

    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res
        .status(400)
        .json({ message: "categoryIds must be a non-empty array" });
    }
    if (!amount || !startDate) {
      return res
        .status(400)
        .json({ message: "amount and startDate are required" });
    }

    const invalidIds = categoryIds.filter(
      (cid) => !mongoose.Types.ObjectId.isValid(cid),
    );
    if (invalidIds.length > 0) {
      return res
        .status(400)
        .json({ message: "One or more categoryIds are invalid" });
    }

    const validCategories = await Category.find({
      _id: { $in: categoryIds },
      $or: [{ isDefault: true }, { userId }],
    });
    if (validCategories.length !== categoryIds.length) {
      return res
        .status(400)
        .json({ message: "One or more categories not found or unauthorized" });
    }

    const budgetPeriod = period || "monthly";
    const overlap = await findOverlappingBudget({
      userId,
      categoryIds,
      period: budgetPeriod,
      startDate,
    });
    if (overlap) {
      return res.status(409).json({
        message:
          "A budget already covers one of these categories in this period",
        conflictingBudgetId: overlap._id,
      });
    }

    const budget = await Budget.create({
      userId,
      categoryIds,
      amount,
      period: budgetPeriod,
      startDate: new Date(startDate),
      alertThreshold,
    });

    const spent = await reconcileBudget(budget);

    res.status(201).json({
      message: "Budget created successfully",
      budget: { ...budget.toObject(), spent },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating budget", error: error.message });
  }
};

//* @desc    Update a budget's categories/amount/period
//* @route   PUT /api/budgets/:id
export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { categoryIds, amount, period, startDate, alertThreshold } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const budget = await Budget.findOne({ _id: id, userId });
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    if (categoryIds !== undefined) {
      if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
        return res
          .status(400)
          .json({ message: "categoryIds must be a non-empty array" });
      }
      const validCategories = await Category.find({
        _id: { $in: categoryIds },
        $or: [{ isDefault: true }, { userId }],
      });
      if (validCategories.length !== categoryIds.length) {
        return res.status(400).json({
          message: "One or more categories not found or unauthorized",
        });
      }
      budget.categoryIds = categoryIds;
    }

    if (period !== undefined) budget.period = period;
    if (startDate !== undefined) budget.startDate = new Date(startDate);
    if (amount !== undefined) budget.amount = amount;
    if (alertThreshold !== undefined) budget.alertThreshold = alertThreshold;

    const overlap = await findOverlappingBudget(
      {
        userId,
        categoryIds: budget.categoryIds,
        period: budget.period,
        startDate: budget.startDate,
      },
      budget._id,
    );
    if (overlap) {
      return res.status(409).json({
        message:
          "A budget already covers one of these categories in this period",
        conflictingBudgetId: overlap._id,
      });
    }

    await budget.save();

    const spent = await reconcileBudget(budget);

    res.status(200).json({
      message: "Budget updated",
      budget: { ...budget.toObject(), spent },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating budget", error: error.message });
  }
};

//* @desc    Delete a budget
//* @route   DELETE /api/budgets/:id
export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const budget = await Budget.findOneAndDelete({ _id: id, userId });
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    res.status(200).json({ message: "Budget deleted successfully", id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting budget", error: error.message });
  }
};
