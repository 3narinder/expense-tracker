import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "../models/TransactionSchema.js";
import Category from "../models/CategorySchema.js";
import Account from "../models/AccountSchema.js";

dotenv.config();

const TARGET_USER_ID = "6a44bfffac8d04ad8b306673";
const TARGET_ACCOUNT_ID = "6a44bfffac8d04ad8b306674";

const seedTransactions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_DEV);
    console.log("🚀 Connected to DB. Starting clean seed...");

    // 1. Fetch Categories
    const categories = await Category.find();
    if (categories.length === 0) {
      throw new Error(
        "No categories found! Run your category seed script first.",
      );
    }

    const getCatId = (name) => {
      const cat = categories.find(
        (c) => c.name.toLowerCase() === name.toLowerCase(),
      );
      return cat ? cat._id : categories[0]._id;
    };

    // 2. Clear old transactions for this specific user
    await Transaction.deleteMany({ userId: TARGET_USER_ID });
    console.log("🧹 Cleared previous transactions.");

    const transactions = [];

    // Helper: Add standard transaction
    const add = (
      daysAgo,
      categoryName,
      amount,
      type,
      description,
      tags = [],
      notes = "",
    ) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      transactions.push({
        userId: TARGET_USER_ID,
        accountId: TARGET_ACCOUNT_ID,
        categoryId: getCatId(categoryName),
        amount: Number(amount.toFixed(2)),
        type,
        description,
        transactionDate: d,
        tags,
        notes,
        recurring: false,
      });
    };

    // Helper: Add recurring subscription
    const addRecurring = (categoryName, amount, description) => {
      transactions.push({
        userId: TARGET_USER_ID,
        accountId: TARGET_ACCOUNT_ID,
        categoryId: getCatId(categoryName),
        amount: amount,
        type: "expense",
        description,
        transactionDate: new Date(),
        recurring: true,
        recurringFrequency: "monthly",
        tags: ["subscription", "media"],
        notes: "Auto-pay enabled",
      });
    };

    // --- SEED SUBSCRIPTIONS ---
    addRecurring("Entertainment", 15.99, "Netflix");
    addRecurring("Entertainment", 9.99, "Disney+ Hotstar");
    addRecurring("Entertainment", 12.99, "Amazon Prime");
    addRecurring("Entertainment", 5.99, "Spotify Premium");
    addRecurring("Utilities", 25.0, "Cloud Storage");
    addRecurring("Healthcare", 49.0, "Gym Membership");

    // --- SEED TIMELINE DATA ---
    [0, 14, 30, 44, 60, 74, 90].forEach((n) =>
      add(n, "Salary", 2750, "income", "Salary deposit", ["work"]),
    );
    [3, 33, 63, 93].forEach((n) =>
      add(n, "Rent", 1800, "expense", "Monthly rent", ["fixed"]),
    );
    [2, 9, 16, 23, 30].forEach((n) =>
      add(n, "Groceries", 60 + (n % 10), "expense", "Weekly grocery", ["food"]),
    );
    add(
      5,
      "Groceries",
      200,
      "expense",
      "Monthly Costco haul",
      ["bulk", "food"],
      "Bought enough for 2 weeks",
    );
    add(
      11,
      "Shopping",
      120,
      "expense",
      "New shoes",
      ["sports"],
      "Running shoes",
    );
    add(
      40,
      "Travel",
      220,
      "expense",
      "Weekend trip",
      ["vacation"],
      "Hotel booking",
    );

    // --- INSERT ---
    await Transaction.insertMany(transactions);
    console.log(`✅ Seeded ${transactions.length} transactions.`);

    // 3. Sync Account Balance
    const netImpact = transactions.reduce(
      (acc, tx) => (tx.type === "income" ? acc + tx.amount : acc - tx.amount),
      0,
    );

    await Account.findByIdAndUpdate(TARGET_ACCOUNT_ID, { balance: netImpact });

    console.log(`🏦 Balance synced: $${netImpact.toFixed(2)}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedTransactions();
