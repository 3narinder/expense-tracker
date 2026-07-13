import mongoose from "mongoose";
import Transaction from "../models/TransactionSchema.js";
import Account from "../models/AccountSchema.js";

// ==========================================
// 🛠️ UTILITIES & BOUNDARIES
// ==========================================

const getMongoUserId = (req) => {
  const id = req.user?.id || req.user?._id;
  return id ? new mongoose.Types.ObjectId(id) : null;
};

const getDateBoundaries = () => {
  const now = new Date();
  return {
    now,
    startOfThisMonth: new Date(now.getFullYear(), now.getMonth(), 1),
    sixMonthsAgo: new Date(now.getFullYear(), now.getMonth() - 5, 1),
  };
};

const sumByType = (type) => ({
  $sum: { $cond: [{ $eq: ["$type", type] }, "$amount", 0] },
});

//** ==========================================
//** 📦 PURE DATA FETCHING FUNCTIONS (Reusable)
//** ==========================================

export const fetchMonthSummaryData = async (mongoUserId) => {
  const { now, startOfThisMonth } = getDateBoundaries();

  const [accounts, transactionMetrics] = await Promise.all([
    Account.find({ userId: mongoUserId }),
    Transaction.aggregate([
      {
        $match: {
          userId: mongoUserId,
          transactionDate: { $gte: startOfThisMonth, $lte: now },
        },
      },
      {
        $group: {
          _id: null,
          incomeThisMonth: sumByType("income"),
          expenseThisMonth: sumByType("expense"),
        },
      },
    ]),
  ]);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const data = transactionMetrics[0] || {
    incomeThisMonth: 0,
    expenseThisMonth: 0,
  };

  const savingsNet = data.incomeThisMonth - data.expenseThisMonth;
  const savingsRate =
    data.incomeThisMonth > 0 ? (savingsNet / data.incomeThisMonth) * 100 : 0;

  return {
    balance: totalBalance,
    incomeThisMonth: data.incomeThisMonth,
    expenseThisMonth: data.expenseThisMonth,
    savingsRate: Math.max(0, parseFloat(savingsRate.toFixed(1))),
    monthlyNet: parseFloat(savingsNet.toFixed(2)),
  };
};

export const fetchMonthlyTrendsData = async (mongoUserId) => {
  const { sixMonthsAgo } = getDateBoundaries();

  const trends = await Transaction.aggregate([
    {
      $match: {
        userId: mongoUserId,
        transactionDate: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$transactionDate" } },
        income: sumByType("income"),
        expense: sumByType("expense"),
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        month: "$_id",
        income: 1,
        expense: 1,
      },
    },
  ]);

  return trends.map((trend) => ({
    month: trend.month,
    income: trend.income.toFixed(2),
    expense: trend.expense.toFixed(2),
  }));
};

export const fetchCategoryBreakdownData = async (mongoUserId) => {
  const { now, startOfThisMonth } = getDateBoundaries();

  const breakdown = await Transaction.aggregate([
    {
      $match: {
        userId: mongoUserId,
        type: "expense",
        transactionDate: { $gte: startOfThisMonth, $lte: now },
      },
    },
    {
      $group: {
        _id: "$categoryId",
        totalAmount: { $sum: "$amount" },
        transaction_count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $unwind: {
        path: "$categoryDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $sort: { totalAmount: -1 } },
    {
      $project: {
        _id: 0,
        category_id: "$_id",
        category_name: { $ifNull: ["$categoryDetails.name", "Uncategorized"] },
        category_icon: { $ifNull: ["$categoryDetails.icon", "help-circle"] },
        category_color: { $ifNull: ["$categoryDetails.color", "#94A3B8"] },
        total: "$totalAmount",
        transaction_count: 1,
      },
    },
  ]);

  return breakdown.map((item) => ({
    ...item,
    total: item.total.toFixed(2),
  }));
};

//** ==========================================
//** 🚀 EXPRESS ROUTE HANDLERS
//** ==========================================

export const getAIContextData = async (mongoUserId) => {
  const [summary, trends, breakdown] = await Promise.all([
    fetchMonthSummaryData(mongoUserId),
    fetchMonthlyTrendsData(mongoUserId),
    fetchCategoryBreakdownData(mongoUserId),
  ]);

  return {
    summary,
    trends,
    breakdown,
  };
};

export const getMonthSummary = async (req, res) => {
  try {
    const mongoUserId = getMongoUserId(req);
    if (!mongoUserId) return res.status(401).json({ message: "Unauthorized" });

    const data = await fetchMonthSummaryData(mongoUserId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error compiling analytics", error: error.message });
  }
};

export const getMonthlyTrends = async (req, res) => {
  try {
    const mongoUserId = getMongoUserId(req);
    if (!mongoUserId) return res.status(401).json({ message: "Unauthorized" });

    const data = await fetchMonthlyTrendsData(mongoUserId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching monthly trends", error: error.message });
  }
};

export const getCategoryBreakdown = async (req, res) => {
  try {
    const mongoUserId = getMongoUserId(req);
    if (!mongoUserId) return res.status(401).json({ message: "Unauthorized" });

    const data = await fetchCategoryBreakdownData(mongoUserId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching category breakdown",
      error: error.message,
    });
  }
};
