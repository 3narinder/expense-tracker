import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/UserSchema.js";

dotenv.config();

const VALID_PLANS = new Set(["basic", "pro", "premium"]);
const VALID_MODES = new Set(["missing", "all", "migrate-legacy"]);

const printUsage = () => {
  console.log(`
Backfill subscriptionPlan for existing users

Usage:
  node utils/backfillSubscriptionPlan.js --env=<dev|prod> --plan=<basic|pro|premium> --mode=<missing|all|migrate-legacy> [--dry-run]

Examples:
  node utils/backfillSubscriptionPlan.js --env=dev --plan=basic --mode=missing
  node utils/backfillSubscriptionPlan.js --env=dev --plan=pro --mode=all --dry-run
  node utils/backfillSubscriptionPlan.js --env=prod --mode=migrate-legacy

Modes:
  missing         Only users with missing/null/empty subscriptionPlan are updated (--plan required)
  all             All users are updated (--plan required)
  migrate-legacy  Migrates legacy aiInsightPlan values into subscriptionPlan and maps
                  personal -> pro. Safe to run repeatedly (idempotent).

Options:
  --env      Database target environment (dev or prod). Default: dev
  --plan     Plan value to apply. Required for missing/all modes. Default: basic
  --mode     See Modes above. Default: missing
  --dry-run  Only prints how many users would be updated
  --help     Show this help message
`);
};

const getArgValue = (name, fallback = null) => {
  const prefix = `${name}=`;
  const direct = process.argv.find((arg) => arg.startsWith(prefix));
  if (direct) return direct.slice(prefix.length);

  const idx = process.argv.indexOf(name);
  if (
    idx >= 0 &&
    process.argv[idx + 1] &&
    !process.argv[idx + 1].startsWith("--")
  ) {
    return process.argv[idx + 1];
  }

  return fallback;
};

const hasFlag = (name) => process.argv.includes(name);

const resolveMongoUri = (envTarget) => {
  if (envTarget === "prod") {
    return {
      uri: process.env.MONGO_URI_PRODUCTION || process.env.MONGO_URI,
      source: process.env.MONGO_URI_PRODUCTION
        ? "MONGO_URI_PRODUCTION"
        : "MONGO_URI",
    };
  }

  return {
    uri: process.env.MONGO_URI_DEV || process.env.MONGO_URI,
    source: process.env.MONGO_URI_DEV ? "MONGO_URI_DEV" : "MONGO_URI",
  };
};

const run = async () => {
  if (hasFlag("--help")) {
    printUsage();
    return;
  }

  const envTarget = getArgValue("--env", "dev");
  const plan = getArgValue("--plan", "basic");
  const mode = getArgValue("--mode", "missing");
  const dryRun = hasFlag("--dry-run");

  if (!["dev", "prod"].includes(envTarget)) {
    throw new Error(`Invalid --env value "${envTarget}". Use "dev" or "prod".`);
  }
  if (mode !== "migrate-legacy" && !VALID_PLANS.has(plan)) {
    throw new Error(`Invalid --plan value "${plan}".`);
  }
  if (!VALID_MODES.has(mode)) {
    throw new Error(`Invalid --mode value "${mode}".`);
  }

  const { uri, source } = resolveMongoUri(envTarget);
  if (!uri) {
    throw new Error(
      `Missing MongoDB URI for ${envTarget}. Set ${envTarget === "prod" ? "MONGO_URI_PRODUCTION or MONGO_URI" : "MONGO_URI_DEV or MONGO_URI"}.`,
    );
  }

  await mongoose.connect(uri);
  console.log(`✅ Connected to ${envTarget} database using ${source}`);

  if (mode === "migrate-legacy") {
    const legacyUsers = await User.find(
      {
        $or: [
          { subscriptionPlan: { $exists: false } },
          { subscriptionPlan: null },
          { subscriptionPlan: "" },
        ],
        aiInsightPlan: { $exists: true },
      },
      { _id: 1, aiInsightPlan: 1, subscriptionPlan: 1 },
    ).lean();

    const candidates = legacyUsers.map((u) => {
      const legacy = String(u.aiInsightPlan || "").toLowerCase().trim();
      if (legacy === "personal") return { id: u._id, subscriptionPlan: "pro" };
      if (VALID_PLANS.has(legacy)) return { id: u._id, subscriptionPlan: legacy };
      return null;
    }).filter(Boolean);

    if (dryRun) {
      console.log(
        `🧪 Dry run: ${candidates.length} user(s) would be migrated from aiInsightPlan to subscriptionPlan.`,
      );
      await mongoose.disconnect();
      return;
    }

    if (candidates.length > 0) {
      const writes = candidates.map((c) => ({
        updateOne: {
          filter: { _id: c.id },
          update: { $set: { subscriptionPlan: c.subscriptionPlan } },
        },
      }));
      const result = await User.bulkWrite(writes);
      console.log(
        `✅ Legacy migration complete. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`,
      );
    } else {
      console.log("✅ Legacy migration complete. No users required updates.");
    }

    await mongoose.disconnect();
    return;
  }

  const filter =
    mode === "all"
      ? {}
      : {
          $or: [
            { subscriptionPlan: { $exists: false } },
            { subscriptionPlan: null },
            { subscriptionPlan: "" },
          ],
        };

  const matched = await User.countDocuments(filter);
  if (dryRun) {
    console.log(
      `🧪 Dry run: ${matched} user(s) would be updated to subscriptionPlan="${plan}" using mode="${mode}".`,
    );
    await mongoose.disconnect();
    return;
  }

  const result = await User.updateMany(filter, {
    $set: { subscriptionPlan: plan },
  });

  console.log(
    `✅ Backfill complete. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}, Plan: ${plan}, Mode: ${mode}`,
  );

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error("❌ Backfill failed:", error.message);
  await mongoose.disconnect();
  process.exit(1);
});

