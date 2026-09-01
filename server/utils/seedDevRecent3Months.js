import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "../models/TransactionSchema.js";
import Category from "../models/CategorySchema.js";
import Account from "../models/AccountSchema.js";

dotenv.config();

// Use the same test user/account IDs the repo seeds expect locally.
const TARGET_USER_ID = process.env.SEED_USER_ID || "6a44dd1e8848e1c16ef1b6a2";
const TARGET_ACCOUNT_ID = process.env.SEED_ACCOUNT_ID || "6a44dd1f8848e1c16ef1b6a3";
const TARGET_PROFILE_TYPE = "personal";

const buildRecentTransactions = async (userId, accountId, days = 90) => {
  const categories = await Category.find({
    $or: [{ isDefault: true }, { userId, profileType: TARGET_PROFILE_TYPE }],
  });
  const catMap = Object.fromEntries(categories.map((c) => [c.name, c]));

  const today = new Date();
  const out = [];
  const dateNDaysAgo = (n) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    // normalize hour to midday to avoid timezone shifts in UI
    d.setHours(12, 0, 0, 0);
    return d;
  };

  const add = (daysAgo, categoryName, amount, type, description, merchant = description, notes = "") => {
    const c = catMap[categoryName];
    if (!c) {
      console.warn(`Category '${categoryName}' not found. Skipping transaction.`);
      return;
    }
    const randomVariation = type === "expense" ? (Math.random() * 0.2 - 0.1) : (Math.random() * 0.05);
    const finalAmount = Math.max(1, amount + amount * randomVariation);
    out.push({
      userId,
      profileType: TARGET_PROFILE_TYPE,
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

  // Income: salary every ~30 days
  for (let d = 7; d <= days; d += 30) {
    add(d, "Salary", 32000, "income", "Monthly Salary", "Employer Inc", "Salary");
  }

  // Freelance occasional
  for (let d = 10; d <= days; d += 45) {
    add(d, "Freelance", 9000 + Math.round(Math.random() * 6000), "income", "Freelance Project", "Upwork");
  }

  // Groceries weekly
  for (let d = 2; d <= days; d += 7) {
    add(d, "Groceries", 1200 + Math.round(Math.random() * 400), "expense", "Weekly Groceries", "Local Mart");
  }

  // Food & Dining every 3-4 days
  for (let d = 1; d <= days; d += 3) {
    const amount = (d % 7 === 0 || d % 7 === 1) ? 800 + Math.round(Math.random() * 400) : 300 + Math.round(Math.random() * 200);
    add(d, "Food & Dining", amount, "expense", d % 3 === 0 ? "Dinner out" : "Lunch", d % 3 === 0 ? "Restaurant" : "Zomato");
  }

  // Transport every 4-6 days
  for (let d = 4; d <= days; d += 5) {
    add(d, "Transportation", 300 + Math.round(Math.random() * 500), "expense", "Commute / Ride", "Uber/Auto");
  }

  // Utilities monthly
  for (let d = 5; d <= days; d += 30) {
    add(d, "Utilities", 1800 + Math.round(Math.random() * 600), "expense", "Electricity Bill", "Power Co");
    add(d + 2, "Utilities", 799, "expense", "Internet", "ISP");
  }

  // Rent once per month
  for (let d = 3; d <= days; d += 30) {
    add(d, "Rent", 12500, "expense", "Apartment Rent", "Landlord");
  }

  // Entertainment subscriptions and occasional movies
  for (let d = 8; d <= days; d += 30) {
    add(d, "Entertainment", 649, "expense", "Subscription: Netflix", "Netflix");
  }
  for (let d = 20; d <= days; d += 40) {
    add(d, "Entertainment", 1000 + Math.round(Math.random() * 800), "expense", "Movie Night", "Cinema");
  }

  // A couple of large unusual expenses to test alerts
  add(18, "Shopping", 8500, "expense", "New Laptop Accessory", "ElectroStore", "One-off large purchase");
  add(45, "Shopping", 7500, "expense", "Furniture", "HomeStore", "One-off large purchase");

  return out;
};

const run = async () => {
  try {
    console.log("⏳ Connecting to development DB...");
    const uri = process.env.MONGO_URI_DEV || process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI_DEV not set in environment.");
    await mongoose.connect(uri);

    console.log(`🗑️ Removing existing transactions for user ${TARGET_USER_ID} (profile=${TARGET_PROFILE_TYPE})`);
    await Transaction.deleteMany({ userId: TARGET_USER_ID, profileType: TARGET_PROFILE_TYPE });

    console.log("🛠️ Building 90 days of mock transactions...");
    const txs = await buildRecentTransactions(TARGET_USER_ID, TARGET_ACCOUNT_ID, 90);

    console.log(`💾 Inserting ${txs.length} transactions...`);
    await Transaction.insertMany(txs);

    const totalNet = txs.reduce((s, t) => s + (t.type === "income" ? t.amount : -t.amount), 0);
    const BASELINE = 20000;
    const newBal = Math.max(0, BASELINE + totalNet);
    await Account.findByIdAndUpdate(TARGET_ACCOUNT_ID, { balance: newBal });

    console.log(`✅ Seeded ${txs.length} transactions and set account balance to ₹${newBal.toFixed(2)}`);
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

run();
