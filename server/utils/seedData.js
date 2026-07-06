import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "../models/TransactionSchema.js";
import Category from "../models/CategorySchema.js";
import Account from "../models/AccountSchema.js";

dotenv.config();

const TARGET_USER_ID = "6a44dd1e8848e1c16ef1b6a2";
const TARGET_ACCOUNT_ID = "6a44dd1f8848e1c16ef1b6a3";

const buildMockTransactions = async (userId, accountId) => {
  // Fetch categories to map names to ObjectIds
  const categories = await Category.find({
    $or: [{ isDefault: true }, { userId }],
  });
  const catMap = Object.fromEntries(categories.map((c) => [c.name, c]));

  // Anchor date to today (July 6, 2026 based on your context)
  const today = new Date();
  const out = [];

  const dateNDaysAgo = (n) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return d;
  };

  // Helper to push transactions
  const add = (
    daysAgo,
    categoryName,
    amount,
    type,
    description,
    merchant = description,
    notes = "",
  ) => {
    const c = catMap[categoryName];
    if (!c) {
      console.warn(
        `⚠️ Category '${categoryName}' not found. Skipping transaction.`,
      );
      return;
    }

    // Slight randomization to make charts look organic, not perfectly flat
    const randomVariation = type === "expense" ? Math.random() * 0.1 - 0.05 : 0;
    const finalAmount = amount + amount * randomVariation;

    out.push({
      userId,
      accountId,
      categoryId: c._id,
      amount: parseFloat(finalAmount.toFixed(2)),
      type,
      description,
      merchant,
      notes,
      transactionDate: dateNDaysAgo(daysAgo),
      recurring: false,
    });
  };

  // ==========================================
  // 1. SPECIFIC REQUESTED TRANSACTION
  // ==========================================
  // Note: 5 days ago is July 1st, 2026
  add(
    5,
    "Freelance",
    28000,
    "income",
    "Salary deposit",
    "Salary deposit",
    "Freelancer project",
  );

  // ==========================================
  // 2. GENERATE 6 MONTHS OF HISTORICAL DATA
  // ==========================================

  // INCOME: Monthly Salary (~1st of every month)
  [35, 66, 94, 125, 155, 186].forEach((n) => {
    add(
      n,
      "Salary",
      32000,
      "income",
      "Tech Corp Salary",
      "Tech Corp Pvt Ltd",
      "Monthly Salary",
    );
  });

  // INCOME: Occasional Freelance/Side Hustle
  [22, 58, 110, 142].forEach((n) => {
    add(
      n,
      "Freelance",
      12000,
      "income",
      "UI Design Project",
      "Upwork",
      "Completed landing page",
    );
  });

  // EXPENSE: Monthly Rent (Around the 3rd of the month)
  [3, 33, 63, 93, 124, 153].forEach((n) => {
    add(
      n,
      "Rent",
      12500,
      "expense",
      "Apartment Rent",
      "Landlord",
      "Monthly Rent Transfer",
    );
  });

  // EXPENSE: Monthly Utilities (Electricity, Internet)
  [7, 37, 67, 97, 128, 157].forEach((n) => {
    add(
      n,
      "Utilities",
      1800,
      "expense",
      "Electricity Bill",
      "State Power Board",
      "Online Payment",
    );
    add(
      n + 1,
      "Utilities",
      999,
      "expense",
      "Fiber Internet",
      "Jio/Airtel",
      "Monthly Broadband",
    );
  });

  // EXPENSE: Weekly Groceries (Every ~7 days)
  for (let i = 2; i <= 180; i += 7) {
    add(
      i,
      "Groceries",
      1200,
      "expense",
      "Weekly Groceries",
      "Local Supermarket",
      "Vegetables and pantry",
    );
  }

  // EXPENSE: Food & Dining (Every 3-4 days)
  for (let i = 1; i <= 180; i += 3) {
    const isWeekend = i % 7 === 0 || i % 7 === 1;
    const amount = isWeekend ? 850 : 350;
    const desc = isWeekend
      ? "Dinner out with friends"
      : "Office Lunch / Swiggy";
    const merchant = isWeekend ? "Mainland China" : "Zomato/Swiggy";
    add(i, "Food & Dining", amount, "expense", desc, merchant);
  }

  // EXPENSE: Transportation (Fuel or Cab rides)
  for (let i = 4; i <= 180; i += 5) {
    add(
      i,
      "Transportation",
      600,
      "expense",
      "Uber Ride / Petrol",
      "Uber / Shell",
      "Commute",
    );
  }

  // EXPENSE: Entertainment & Subscriptions
  [12, 42, 72, 102, 132, 162].forEach((n) => {
    add(
      n,
      "Entertainment",
      649,
      "expense",
      "Netflix Premium",
      "Netflix",
      "Monthly Subscription",
    );
  });
  [15, 60, 105, 150].forEach((n) => {
    add(
      n,
      "Entertainment",
      1200,
      "expense",
      "Movie Night",
      "PVR Cinemas",
      "Tickets and popcorn",
    );
  });

  return out;
};

const runSeed = async () => {
  try {
    console.log("⏳ Connecting to database...");
    await mongoose.connect(process.env.MONGO_URI_DEV);

    console.log("🗑️ Clearing old transactions for this user...");
    await Transaction.deleteMany({ userId: TARGET_USER_ID });

    console.log("🛠️ Building mock data for 6 months...");
    const txs = await buildMockTransactions(TARGET_USER_ID, TARGET_ACCOUNT_ID);

    console.log("💾 Saving transactions to database...");
    // Insert all documents at once for much faster seeding
    await Transaction.insertMany(txs);

    // Calculate final balance accurately based on generated transactions
    const totalNet = txs.reduce(
      (sum, t) => sum + (t.type === "income" ? t.amount : -t.amount),
      0,
    );

    // Set a realistic baseline balance + the net of all transactions
    const BASELINE_SAVINGS = 25000;
    const newBalance = BASELINE_SAVINGS + totalNet;

    await Account.findByIdAndUpdate(TARGET_ACCOUNT_ID, {
      balance: Math.max(0, newBalance),
    });

    console.log(`✅ Successfully seeded ${txs.length} realistic transactions!`);
    console.log(`💰 Updated Account Balance to: ₹${newBalance.toFixed(2)}`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

runSeed();
