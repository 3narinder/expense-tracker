import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "../models/TransactionSchema.js";
import Category from "../models/CategorySchema.js";
import Account from "../models/AccountSchema.js";

dotenv.config();

const TARGET_USER_ID = "6a44dd1e8848e1c16ef1b6a2";

const buildMockTransactions = async (userId) => {
  const account = await Account.findOne({ userId });
  const categories = await Category.find({
    $or: [{ isDefault: true }, { userId }],
  });
  const catMap = Object.fromEntries(categories.map((c) => [c.name, c]));

  const today = new Date();
  const out = [];

  const dateNDaysAgo = (n) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return d;
  };

  const add = (daysAgo, categoryName, amount, type, description) => {
    const c = catMap[categoryName];
    if (!c) return;
    out.push({
      userId,
      accountId: account._id,
      categoryId: c._id,
      amount: parseFloat(amount.toFixed(2)),
      type,
      description,
      merchant: description,
      transactionDate: dateNDaysAgo(daysAgo),
      recurring: false,
    });
  };

  // --- Logic remains identical to your style ---
  [0, 14, 30, 44, 60, 74, 90].forEach((n) =>
    add(n, "Salary", 2750, "income", "Salary deposit"),
  );
  add(15, "Freelance", 800, "income", "Client project");

  [3, 33, 63, 93].forEach((n) =>
    add(n, "Rent", 1800, "expense", "Monthly rent"),
  );
  [7, 37, 67].forEach((n) =>
    add(n, "Utilities", 95, "expense", "Electric + Internet"),
  );

  // Weekly groceries
  [2, 9, 16, 23, 30, 37, 44, 51, 58, 65, 72, 79].forEach((n) =>
    add(n, "Groceries", 60 + (n % 35), "expense", "Weekly groceries"),
  );

  // Food & Dining
  const foodDays = [
    1, 2, 5, 6, 8, 11, 13, 17, 19, 22, 25, 28, 31, 36, 41, 46, 52, 58, 67, 73,
    81,
  ];
  foodDays.forEach((n, i) => {
    const desc =
      i % 4 === 0
        ? "Coffee"
        : i % 4 === 1
          ? "Lunch"
          : i % 4 === 2
            ? "Dinner out"
            : "Takeout";
    add(n, "Food & Dining", 8 + (n % 32), "expense", desc);
  });

  return out;
};

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_DEV);
    const txs = await buildMockTransactions(TARGET_USER_ID);

    await Transaction.deleteMany({ userId: TARGET_USER_ID });

    // Process one by one to trigger Schema/Controller logic if needed
    for (const tx of txs) {
      await Transaction.create(tx);
    }

    // Simple balance reset
    const total = txs.reduce(
      (sum, t) => sum + (t.type === "income" ? t.amount : -t.amount),
      0,
    );
    await Account.findOneAndUpdate(
      { userId: TARGET_USER_ID },
      { balance: 5000 + total },
    );

    console.log(`✅ Seeded ${txs.length} transactions.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeed();
