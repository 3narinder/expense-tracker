import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/UserSchema.js";

dotenv.config();

const VALID_PLANS = new Set(["basic", "personal", "premium"]);
const VALID_MODES = new Set(["missing", "all"]);

const printUsage = () => {
  console.log(`
Backfill aiInsightPlan for existing users

Usage:
  node utils/backfillAiInsightPlan.js --env=<dev|prod> --plan=<basic|personal|premium> --mode=<missing|all> [--dry-run]

Examples:
  node utils/backfillAiInsightPlan.js --env=dev --plan=basic --mode=missing
  node utils/backfillAiInsightPlan.js --env=prod --plan=personal --mode=all --dry-run

Options:
  --env      Database target environment (dev or prod). Default: dev
  --plan     Plan value to apply. Default: basic
  --mode     missing => only users with missing/empty plan, all => all users
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
  if (!VALID_PLANS.has(plan)) {
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

  const filter =
    mode === "all"
      ? {}
      : {
          $or: [
            { aiInsightPlan: { $exists: false } },
            { aiInsightPlan: null },
            { aiInsightPlan: "" },
          ],
        };

  const matched = await User.countDocuments(filter);
  if (dryRun) {
    console.log(
      `🧪 Dry run: ${matched} user(s) would be updated to aiInsightPlan="${plan}" using mode="${mode}".`,
    );
    await mongoose.disconnect();
    return;
  }

  const result = await User.updateMany(filter, {
    $set: { aiInsightPlan: plan },
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
