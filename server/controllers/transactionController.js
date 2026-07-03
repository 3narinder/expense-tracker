import mongoose from "mongoose";
import Transaction from "../models/TransactionSchema.js";
import Category from "../models/CategorySchema.js";
import Account from "../models/AccountSchema.js";

import {
  syncBudgetsOnCreate,
  syncBudgetsOnUpdate,
  syncBudgetsOnDelete,
} from "../utils/budgetSync.js";

// Helper: Calculate how a transaction affects an account balance
const getBalanceImpact = (type, amount) =>
  type === "income" ? amount : -amount;

//* @desc    Get paginated, sorted, and filtered transactions with real-time insights
//* @route   GET /api/transactions

export const getTransactions = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const {
      type,
      categoryId,
      accountId,
      startDate,
      endDate,
      search,
      recurring,
    } = req.query;

    //**  Base filter WITHOUT type — shared by counts (so tabs describe each other correctly)
    const baseFilter = { userId: userObjectId };

    if (recurring === "true" || recurring === "false")
      baseFilter.recurring = recurring === "true";

    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
      baseFilter.categoryId = new mongoose.Types.ObjectId(categoryId);
    }
    if (accountId && mongoose.Types.ObjectId.isValid(accountId)) {
      baseFilter.accountId = new mongoose.Types.ObjectId(accountId);
    }
    if (startDate || endDate) {
      baseFilter.transactionDate = {};
      if (startDate) baseFilter.transactionDate.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        baseFilter.transactionDate.$lte = end;
      }
    }
    if (search) {
      baseFilter.$or = [
        { description: { $regex: search, $options: "i" } },
        { merchant: { $regex: search, $options: "i" } },
      ];
    }

    //** filter = baseFilter + type, used for the actual list + income/expense totals
    const filter = { ...baseFilter };
    if (type === "income" || type === "expense") filter.type = type;

    const [result] = await Transaction.aggregate([
      { $match: baseFilter }, // match the wider set once; type-specific stages filter further below
      {
        $facet: {
          stats: [
            { $match: filter.type ? { type: filter.type } : {} },
            {
              $group: {
                _id: null,
                totalIncome: {
                  $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
                },
                totalExpense: {
                  $sum: {
                    $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
                  },
                },
                count: { $sum: 1 },
              },
            },
          ],
          counts: [{ $group: { _id: "$type", count: { $sum: 1 } } }],
          paginated: [
            { $match: filter.type ? { type: filter.type } : {} },
            { $sort: { transactionDate: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "categoryId",
                pipeline: [
                  { $project: { name: 1, icon: 1, color: 1, isDefault: 1 } },
                ],
              },
            },
            {
              $unwind: {
                path: "$categoryId",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "accounts",
                localField: "accountId",
                foreignField: "_id",
                as: "accountId",
                pipeline: [{ $project: { name: 1, type: 1, currency: 1 } }],
              },
            },
            {
              $unwind: { path: "$accountId", preserveNullAndEmptyArrays: true },
            },
          ],
        },
      },
    ]);

    const statsRow = result.stats[0] || {};
    const totalTransactions = statsRow.count || 0;
    const totalIncome = statsRow.totalIncome || 0;
    const totalExpense = statsRow.totalExpense || 0;
    const netBalance = totalIncome - totalExpense;

    //** Reshape counts array -> {all, income, expense}
    const counts = { all: 0, income: 0, expense: 0 };
    for (const row of result.counts) {
      if (row._id === "income" || row._id === "expense") {
        counts[row._id] = row.count;
        counts.all += row.count;
      }
    }

    res.status(200).json({
      pagination: {
        total: totalTransactions,
        page,
        limit,
        totalPages: Math.ceil(totalTransactions / limit) || 1,
      },
      stats: { totalIncome, totalExpense, netBalance, counts },
      transactions: result.paginated,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
};

//* @desc    Get a single transaction by ID
//* @route   GET /api/transactions/:id

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID format" });

    const tx = await Transaction.findOne({ _id: id, userId })
      .populate("categoryId", "name icon color isDefault")
      .populate("accountId", "name type currency"); // NEW

    if (!tx) return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json(tx);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transaction", error: error.message });
  }
};

//* @desc    Get income/expense trend bucketed by day or month
//* @route   GET /api/transactions/trend
export const getTransactionTrend = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const { type, categoryId, accountId, search, range, startDate, endDate } =
      req.query;

    const filter = { userId: userObjectId };
    if (type === "income" || type === "expense") filter.type = type;
    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
      filter.categoryId = new mongoose.Types.ObjectId(categoryId);
    }
    if (accountId && mongoose.Types.ObjectId.isValid(accountId)) {
      filter.accountId = new mongoose.Types.ObjectId(accountId);
    }
    if (search) {
      filter.$or = [
        { description: { $regex: search, $options: "i" } },
        { merchant: { $regex: search, $options: "i" } },
      ];
    }
    if (startDate || endDate) {
      filter.transactionDate = {};
      if (startDate) filter.transactionDate.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.transactionDate.$lte = end;
      }
    } else if (range) {
      const now = new Date();
      let start;
      if (range === "30d")
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      else if (range === "3m")
        start = new Date(new Date().setMonth(now.getMonth() - 3));
      else if (range === "monthly")
        start = new Date(new Date().setMonth(now.getMonth() - 1));
      else if (range === "yearly")
        start = new Date(new Date().setFullYear(now.getFullYear() - 1));
      if (start) filter.transactionDate = { $gte: start };
    }

    const bucketFormat = range === "yearly" ? "%Y-%m" : "%Y-%m-%d";

    const rows = await Transaction.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
          pipeline: [{ $project: { name: 1 } }],
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: {
            label: {
              $dateToString: { format: bucketFormat, date: "$transactionDate" },
            },
            type: "$type",
            category: { $ifNull: ["$category.name", "Uncategorized"] },
          },
          amount: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.label": 1 } },
    ]);

    // Reshape flat rows into one object per date bucket, with income/expense
    // totals plus a category breakdown for each side.
    const buckets = new Map();
    for (const row of rows) {
      const { label, type: txType, category } = row._id;
      if (!buckets.has(label)) {
        buckets.set(label, {
          label,
          income: 0,
          expense: 0,
          incomeByCategory: [],
          expenseByCategory: [],
        });
      }
      const bucket = buckets.get(label);
      bucket[txType] += row.amount;
      bucket[`${txType}ByCategory`].push({
        name: category,
        amount: row.amount,
      });
    }

    const trend = Array.from(buckets.values()).sort((a, b) =>
      a.label.localeCompare(b.label),
    );

    res.status(200).json({ trend });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trend", error: error.message });
  }
};
//* @desc    Create a transaction (UPDATED WITH BALANCE MATH)
//* @route   POST /api/transactions
export const createTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    let createdTransaction;

    await session.withTransaction(async () => {
      const userId = req.user?.id || req.user?._id;
      const {
        accountId,
        categoryId,
        amount,
        type,
        description,
        merchant,
        tags,
        notes,
        transactionDate,
        recurring,
        recurringFrequency,
      } = req.body;

      if (!amount || !type || !categoryId || !accountId) {
        throw Object.assign(
          new Error(
            "Missing required fields (amount, type, category, account)",
          ),
          {
            statusCode: 400,
          },
        );
      }

      //* Validate Account
      const account = await Account.findOne({ _id: accountId, userId }).session(
        session,
      );
      if (!account) {
        throw Object.assign(new Error("Account not found or unauthorized"), {
          statusCode: 400,
        });
      }

      //* Validate Category
      const category = await Category.findOne({
        _id: categoryId,
        $or: [{ isDefault: true }, { userId }],
      }).session(session);
      if (!category) {
        throw Object.assign(new Error("Category not found or unauthorized"), {
          statusCode: 400,
        });
      }

      const parsedAmount = parseFloat(amount);
      const txDate = transactionDate ? new Date(transactionDate) : new Date();

      const transaction = new Transaction({
        userId,
        accountId,
        categoryId,
        type,
        description,
        merchant,
        tags,
        notes,
        amount: parsedAmount,
        transactionDate: txDate,
        recurring: recurring || false,
        recurringFrequency: recurring ? recurringFrequency : null,
      });

      await transaction.save({ session });

      //* Update Account Balance (same session)
      account.balance += getBalanceImpact(type, parsedAmount);
      await account.save({ session });

      //* NEW: Sync any matching budgets' cached spend, same session
      await syncBudgetsOnCreate(
        {
          userId,
          categoryId,
          transactionDate: txDate,
          type,
          amount: parsedAmount,
        },
        session,
      );

      createdTransaction = transaction;
    });

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: createdTransaction,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error creating transaction",
      error: error.message,
    });
  } finally {
    await session.endSession();
  }
};

//* @desc    Update a transaction (UPDATED WITH COMPLEX BALANCE MATH)
//* @route   PUT /api/transactions/:id
export const updateTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    let updatedTx;

    await session.withTransaction(async () => {
      const { id } = req.params;
      const userId = req.user?.id || req.user?._id;
      const updates = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw Object.assign(new Error("Invalid ID format"), {
          statusCode: 400,
        });
      }

      const originalTx = await Transaction.findOne({ _id: id, userId }).session(
        session,
      );
      if (!originalTx) {
        throw Object.assign(new Error("Transaction not found"), {
          statusCode: 404,
        });
      }

      //* Ensure referenced models exist if they are being updated
      if (updates.categoryId) {
        const catExists = await Category.findOne({
          _id: updates.categoryId,
          $or: [{ isDefault: true }, { userId }],
        }).session(session);
        if (!catExists) {
          throw Object.assign(new Error("Invalid Category"), {
            statusCode: 400,
          });
        }
      }

      //* BALANCE MATH: If amount, type, or account changes, update balances
      const amountChanged =
        updates.amount !== undefined &&
        Number(updates.amount) !== originalTx.amount;
      const typeChanged =
        updates.type !== undefined && updates.type !== originalTx.type;
      const accountChanged =
        updates.accountId !== undefined &&
        updates.accountId !== originalTx.accountId.toString();

      if (amountChanged || typeChanged || accountChanged) {
        const oldImpact = getBalanceImpact(originalTx.type, originalTx.amount);
        const newType = updates.type || originalTx.type;
        const newAmount =
          updates.amount !== undefined
            ? parseFloat(updates.amount)
            : originalTx.amount;
        const newImpact = getBalanceImpact(newType, newAmount);

        if (accountChanged) {
          const newAccount = await Account.findOne({
            _id: updates.accountId,
            userId,
          }).session(session);
          if (!newAccount) {
            throw Object.assign(new Error("Invalid new Account"), {
              statusCode: 400,
            });
          }

          //* Revert old account, apply to new account
          await Account.findByIdAndUpdate(
            originalTx.accountId,
            { $inc: { balance: -oldImpact } },
            { session },
          );
          await Account.findByIdAndUpdate(
            updates.accountId,
            { $inc: { balance: newImpact } },
            { session },
          );
        } else {
          //* Apply net difference to same account
          const netChange = newImpact - oldImpact;
          await Account.findByIdAndUpdate(
            originalTx.accountId,
            { $inc: { balance: netChange } },
            { session },
          );
        }
      }

      //* Parse the date properly if provided
      if (updates.transactionDate)
        updates.transactionDate = new Date(updates.transactionDate);

      //* NEW: Sync budgets — revert the old (category/amount/type/date)
      //* combination and apply the new one, same session.
      await syncBudgetsOnUpdate(originalTx, updates, session);

      updatedTx = await Transaction.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true, session },
      )
        .populate("categoryId", "name icon color isDefault")
        .populate("accountId", "name type");
    });

    res
      .status(200)
      .json({ message: "Transaction updated", transaction: updatedTx });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error updating transaction",
      error: error.message,
    });
  } finally {
    await session.endSession();
  }
};

//* @desc    Delete a transaction (UPDATED WITH BALANCE REVERSION)
//* @route   DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    let deletedId;

    await session.withTransaction(async () => {
      const { id } = req.params;
      const userId = req.user?.id || req.user?._id;

      const tx = await Transaction.findOne({ _id: id, userId }).session(
        session,
      );
      if (!tx) {
        throw Object.assign(new Error("Transaction not found"), {
          statusCode: 404,
        });
      }

      //* Revert the account balance
      const impact = getBalanceImpact(tx.type, tx.amount);
      await Account.findByIdAndUpdate(
        tx.accountId,
        { $inc: { balance: -impact } },
        { session },
      );

      //* NEW: Revert this transaction's contribution to any matching budgets
      await syncBudgetsOnDelete(tx, session);

      await tx.deleteOne({ session });
      deletedId = id;
    });

    res
      .status(200)
      .json({ message: "Transaction deleted successfully", id: deletedId });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error deleting transaction",
      error: error.message,
    });
  } finally {
    await session.endSession();
  }
};

//* @desc    Bulk delete multiple transactions (UPDATED TO REVERT BALANCES)
//* @route   POST /api/transactions/bulk-delete
export const bulkDeleteTransactions = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    let deletedCount = 0;

    await session.withTransaction(async () => {
      const userId = req.user?.id || req.user?._id;
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw Object.assign(new Error("No transaction IDs provided."), {
          statusCode: 400,
        });
      }

      const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));

      //* Find them first so we know how much to revert from the accounts and budgets.
      const transactionsToDelete = await Transaction.find({
        _id: { $in: validIds },
        userId,
      }).session(session);

      const impactByAccount = new Map();
      for (const tx of transactionsToDelete) {
        const impact = getBalanceImpact(tx.type, tx.amount);
        const key = tx.accountId.toString();
        impactByAccount.set(key, (impactByAccount.get(key) || 0) - impact);
      }

      await Promise.all(
        Array.from(impactByAccount.entries()).map(([accountId, netImpact]) =>
          Account.findByIdAndUpdate(
            accountId,
            { $inc: { balance: netImpact } },
            { session },
          ),
        ),
      );

      await Promise.all(
        transactionsToDelete.map((tx) => syncBudgetsOnDelete(tx, session)),
      );

      const result = await Transaction.deleteMany(
        { _id: { $in: validIds }, userId },
        { session },
      );

      deletedCount = result.deletedCount;
    });

    res.status(200).json({
      message: `Deleted ${deletedCount} transactions.`,
      deletedCount,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Bulk deletion failed",
      error: error.message,
    });
  } finally {
    await session.endSession();
  }
};

//* @desc    Export filtered or explicitly selected transactions to CSV file
//* @route   GET /api/transactions/export-csv

export const exportTransactionsCSV = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const {
      type,
      categoryId,
      accountId,
      startDate,
      endDate,
      search,
      recurring,
      ids,
    } = req.query;
    const filter = { userId: new mongoose.Types.ObjectId(userId) };

    // 1. Handle explicit IDs or dynamic filters
    if (ids) {
      const idArray = ids
        .split(",")
        .filter((id) => mongoose.Types.ObjectId.isValid(id));
      if (idArray.length > 0) {
        filter._id = { $in: idArray };
      }
    } else {
      if (type === "income" || type === "expense") filter.type = type;
      if (recurring === "true" || recurring === "false")
        filter.recurring = recurring === "true";

      if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
        filter.categoryId = new mongoose.Types.ObjectId(categoryId);
      }
      if (accountId && mongoose.Types.ObjectId.isValid(accountId)) {
        filter.accountId = new mongoose.Types.ObjectId(accountId);
      }
      if (startDate || endDate) {
        filter.transactionDate = {};
        if (startDate) filter.transactionDate.$gte = new Date(startDate);
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          filter.transactionDate.$lte = end;
        }
      }
      if (search) {
        filter.$or = [
          { description: { $regex: search, $options: "i" } },
          { merchant: { $regex: search, $options: "i" } },
        ];
      }
    }

    const transactions = await Transaction.find(filter)
      .populate("categoryId", "name")
      .populate("accountId", "name") // NEW: Fetch account name
      .sort({ transactionDate: -1 });

    //* 3. Define CSV Headers
    const headers = [
      "Date",
      "Description",
      "Merchant", // NEW
      "Account", // NEW
      "Type",
      "Amount ($)",
      "Category",
      "Recurring", // NEW
      "Notes",
    ];

    const csvRows = [headers.join(",")];

    //* 4. Format data for CSV
    for (const tx of transactions) {
      const formattedDate = tx.transactionDate
        ? tx.transactionDate.toISOString().split("T")[0]
        : "";
      const typeLabel = tx.type ? tx.type.toUpperCase() : "";
      const amountValue = tx.amount ? tx.amount.toFixed(2) : "0.00";
      const recurringLabel = tx.recurring ? "Yes" : "No";

      //* Escape quotes for CSV safety
      const cleanDesc = `"${(tx.description || "").replace(/"/g, '""')}"`;
      const cleanMerchant = `"${(tx.merchant || "").replace(/"/g, '""')}"`;
      const cleanAccount = `"${(tx.accountId?.name || "Unknown Account").replace(/"/g, '""')}"`;
      const cleanCategory = `"${(tx.categoryId?.name || "Uncategorized").replace(/"/g, '""')}"`;
      const cleanNotes = `"${(tx.notes || "").replace(/"/g, '""')}"`;

      csvRows.push(
        [
          formattedDate,
          cleanDesc,
          cleanMerchant,
          cleanAccount,
          typeLabel,
          amountValue,
          cleanCategory,
          recurringLabel,
          cleanNotes,
        ].join(","),
      );
    }

    const csvString = csvRows.join("\n");

    //* 5. Send CSV to client
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=transactions_export.csv",
    );

    return res.status(200).send(csvString);
  } catch (error) {
    res.status(500).json({
      message: "Error compiling CSV data export module",
      error: error.message,
    });
  }
};
