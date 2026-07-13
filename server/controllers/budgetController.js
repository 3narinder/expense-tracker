import mongoose from "mongoose";
import Budget from "../models/BudgetSchema.js";
import Category from "../models/CategorySchema.js";
import { reconcileBudget, getCategoryConflicts } from "../utils/BudgetSync.js";
import { getPeriodEnd } from "../utils/BudgetPeriod.js";

const formatBudgetForUI = (budget, calculatedSpent = null) => {
  const spentValue =
    calculatedSpent !== null ? calculatedSpent : budget.spent || 0;
  const categories = budget.categoryIds || [];

  const pct = budget.amount > 0 ? (spentValue / budget.amount) * 100 : 0;
  const threshold = budget.alertThreshold || 80;

  let status = "good";
  let message = `You have used ${pct.toFixed(0)}% of your allowance. Everything looks on track.`;

  if (pct >= 100) {
    status = "concerning";
    message = `Critical boundary crossed! Spending exceeds your set limit by ${(spentValue - budget.amount).toFixed(2)}.`;
  } else if (pct >= threshold) {
    status = "caution";
    message = `Warning threshold triggered at ${pct.toFixed(0)}% (Limit: ${threshold}%). Pace your remaining transactions.`;
  }

  return {
    id: budget._id,
    name: budget.name,
    amount: budget.amount,
    spent: spentValue,
    remaining: budget.amount - spentValue,
    percentUsed: Math.round(pct),
    period: budget.period,
    startDate: budget.startDate,
    alertThreshold: budget.alertThreshold,

    // Integrated Live Analysis Object
    analysis: {
      status,
      message,
    },

    categories: categories.map((c) => ({
      id: c._id || c,
      name: c.name || "Unknown",
      icon: c.icon || "help-circle",
      color: c.color || "#94A3B8",
    })),
  };
};

//** ==========================================
//** 2. CONTROLLERS
//** ==========================================

//* @desc    List all budgets for the current user
//* @route   GET /api/budgets
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id })
      .populate("categoryIds", "name icon color")
      .sort({ startDate: -1 });

    const formatted = budgets.map((b) => formatBudgetForUI(b));
    res.status(200).json(formatted);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching budgets", error: error.message });
  }
};

//* @desc    Get a single budget by ID
//* @route   GET /api/budgets/:id
export const getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).populate("categoryIds", "name icon color");

    if (!budget) return res.status(404).json({ message: "Budget not found" });

    const trueSpent = await reconcileBudget(budget);
    res.status(200).json(formatBudgetForUI(budget, trueSpent));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching budget", error: error.message });
  }
};

//* @desc    Create a new budget
//* @route   POST /api/budgets
export const createBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      categoryIds,
      amount,
      period = "monthly",
      startDate,
      alertThreshold = 80,
    } = req.body;

    // Standard field checks
    if (!name || !name.trim())
      return res.status(400).json({ message: "Budget name is required" });
    if (!amount || !startDate)
      return res
        .status(400)
        .json({ message: "Amount and startDate are required" });
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res
        .status(400)
        .json({ message: "categoryIds must be a non-empty array" });
    }

    // Business rule: Overlap checks
    const conflicts = await getCategoryConflicts(
      userId,
      categoryIds,
      period,
      startDate,
    );
    if (conflicts.length > 0) {
      return res.status(409).json({
        message:
          "One or more categories are already assigned to another budget.",
        conflictingCategories: conflicts,
      });
    }

    const budget = await Budget.create({
      userId,
      name: name.trim(),
      categoryIds,
      amount,
      period,
      startDate: new Date(startDate),
      alertThreshold,
    });

    await budget.populate("categoryIds", "name icon color");
    const spent = await reconcileBudget(budget);

    res.status(201).json({
      message: "Budget created successfully",
      budget: formatBudgetForUI(budget, spent), // Now contains live analysis sub-object
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating budget", error: error.message });
  }
};

//* @desc    Update an existing budget
//* @route   PUT /api/budgets/:id
export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, categoryIds, amount, period, startDate, alertThreshold } =
      req.body;

    const budget = await Budget.findOne({ _id: id, userId });
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    const checkPeriod = period || budget.period;
    const checkStart = startDate ? new Date(startDate) : budget.startDate;
    const checkCategories =
      categoryIds || budget.categoryIds.map((id) => id.toString());

    // Evaluate Conflict Boundaries
    const conflicts = await getCategoryConflicts(
      userId,
      checkCategories,
      checkPeriod,
      checkStart,
      id,
    );
    if (conflicts.length > 0) {
      return res.status(409).json({
        message:
          "One or more categories are already assigned to another budget.",
        conflictingCategories: conflicts,
      });
    }

    if (name !== undefined) budget.name = name.trim();
    if (categoryIds !== undefined) budget.categoryIds = categoryIds;
    if (amount !== undefined) budget.amount = amount;
    if (period !== undefined) budget.period = period;
    if (startDate !== undefined) budget.startDate = new Date(startDate);
    if (alertThreshold !== undefined) budget.alertThreshold = alertThreshold;

    await budget.save();
    await budget.populate("categoryIds", "name icon color");

    const spent = await reconcileBudget(budget);

    res.status(200).json({
      message: "Budget updated successfully",
      budget: formatBudgetForUI(budget, spent), // Recalculated live status returned here
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating budget", error: error.message });
  }
};

//* @desc    Delete a budget and stop tracking its limits
//* @route   DELETE /api/budgets/:id
export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid budget ID format" });
    }

    const budget = await Budget.findOneAndDelete({ _id: id, userId });

    if (!budget) {
      return res
        .status(404)
        .json({ message: "Budget not found or unauthorized" });
    }

    // Return the deleted details so the frontend can display a contextual success toast
    res.status(200).json({
      message: "Budget tracking removed successfully",
      id: budget._id,
      name: budget.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting budget",
      error: error.message,
    });
  }
};
