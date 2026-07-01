import mongoose from "mongoose";
import Transaction from "../models/TransactionSchema.js";
import Category from "../models/CategorySchema.js";
import Account from "../models/AccountSchema.js"; // NEW: Required for balance updates

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

    const filter = { userId: userObjectId };

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

    const stats = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalTransactions = stats[0]?.count || 0;
    const totalIncome = stats[0]?.totalIncome || 0;
    const totalExpense = stats[0]?.totalExpense || 0;
    const netBalance = totalIncome - totalExpense;

    const transactions = await Transaction.find(filter)
      .populate("categoryId", "name icon color isDefault")
      .populate("accountId", "name type currency") // NEW
      .sort({ transactionDate: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      pagination: {
        total: totalTransactions,
        page,
        limit,
        totalPages: Math.ceil(totalTransactions / limit) || 1,
      },
      insights: { totalIncome, totalExpense, netBalance },
      transactions,
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

//* @desc    Create a transaction (UPDATED WITH BALANCE MATH)
//* @route   POST /api/transactions
export const createTransaction = async (req, res) => {
  try {
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
      return res.status(400).json({
        message: "Missing required fields (amount, type, category, account)",
      });
    }

    //* Validate Account
    const account = await Account.findOne({ _id: accountId, userId });
    if (!account)
      return res
        .status(400)
        .json({ message: "Account not found or unauthorized" });

    //* Validate Category
    const category = await Category.findOne({
      _id: categoryId,
      $or: [{ isDefault: true }, { userId }],
    });
    if (!category)
      return res
        .status(400)
        .json({ message: "Category not found or unauthorized" });

    const transaction = new Transaction({
      userId,
      accountId,
      categoryId,
      type,
      description,
      merchant,
      tags,
      notes,
      amount: parseFloat(amount),
      transactionDate: transactionDate ? new Date(transactionDate) : new Date(),
      recurring: recurring || false,
      recurringFrequency: recurring ? recurringFrequency : null,
    });

    await transaction.save();

    //* NEW: Update Account Balance
    account.balance += getBalanceImpact(type, parseFloat(amount));
    await account.save();

    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating transaction", error: error.message });
  }
};

//* @desc    Update a transaction (UPDATED WITH COMPLEX BALANCE MATH)
//* @route   PUT /api/transactions/:id
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID format" });

    const originalTx = await Transaction.findOne({ _id: id, userId });
    if (!originalTx)
      return res.status(404).json({ message: "Transaction not found" });

    //* Ensure referenced models exist if they are being updated
    if (updates.categoryId) {
      const catExists = await Category.findOne({
        _id: updates.categoryId,
        $or: [{ isDefault: true }, { userId }],
      });
      if (!catExists)
        return res.status(400).json({ message: "Invalid Category" });
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
        });
        if (!newAccount)
          return res.status(400).json({ message: "Invalid new Account" });

        //* Revert old account, apply to new account
        await Account.findByIdAndUpdate(originalTx.accountId, {
          $inc: { balance: -oldImpact },
        });
        await Account.findByIdAndUpdate(updates.accountId, {
          $inc: { balance: newImpact },
        });
      } else {
        //* Apply net difference to same account
        const netChange = newImpact - oldImpact;
        await Account.findByIdAndUpdate(originalTx.accountId, {
          $inc: { balance: netChange },
        });
      }
    }

    //* Parse the date properly if provided
    if (updates.transactionDate)
      updates.transactionDate = new Date(updates.transactionDate);

    const updatedTx = await Transaction.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true },
    )
      .populate("categoryId", "name icon color isDefault")
      .populate("accountId", "name type");

    res
      .status(200)
      .json({ message: "Transaction updated", transaction: updatedTx });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating transaction", error: error.message });
  }
};

//* @desc    Delete a transaction (UPDATED WITH BALANCE REVERSION)
//* @route   DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id;

    const tx = await Transaction.findOne({ _id: id, userId });
    if (!tx) return res.status(404).json({ message: "Transaction not found" });

    //* Revert the account balance
    const impact = getBalanceImpact(tx.type, tx.amount);
    await Account.findByIdAndUpdate(tx.accountId, {
      $inc: { balance: -impact },
    });

    await tx.deleteOne();

    res.status(200).json({ message: "Transaction deleted successfully", id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting transaction", error: error.message });
  }
};

//* @desc    Bulk delete multiple transactions (UPDATED TO REVERT BALANCES)
//* @route   POST /api/transactions/bulk-delete
export const bulkDeleteTransactions = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No transaction IDs provided." });
    }

    const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));

    //* Find them first so we know how much to revert from the accounts
    const transactionsToDelete = await Transaction.find({
      _id: { $in: validIds },
      userId,
    });

    for (const tx of transactionsToDelete) {
      const impact = getBalanceImpact(tx.type, tx.amount);
      await Account.findByIdAndUpdate(tx.accountId, {
        $inc: { balance: -impact },
      });
    }

    const result = await Transaction.deleteMany({
      _id: { $in: validIds },
      userId,
    });

    res.status(200).json({
      message: `Deleted ${result.deletedCount} transactions.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bulk deletion failed", error: error.message });
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

    // 2. Fetch data and populate Account & Category
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
