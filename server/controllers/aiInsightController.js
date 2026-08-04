import mongoose from "mongoose";
import Insight from "../models/InsightSchema.js";
import Transaction from "../models/TransactionSchema.js";
import { DEVELOPER_PROMPTS } from "../utils/Prompt.js";
import { getGroqClient } from "../utils/groq.js";
import { getAIContextData } from "./dashboardController.js";
import { getPlanConfig } from "../utils/planConfig.js";

const MODEL = "llama-3.3-70b-versatile";
const AI_MIN_TRANSACTION_COUNT = parseInt(
  process.env.AI_MIN_TRANSACTION_COUNT || "10",
  10,
);

// ==========================================
// 🛠️ UTILITIES
// ==========================================

const getMongoUserId = (req) => {
  const id = req.user?.id || req.user?._id;
  return id ? new mongoose.Types.ObjectId(id) : null;
};

const getPlanDetails = (user) => {
  const plan = user?.subscriptionPlan || "basic";
  const config = getPlanConfig(plan);
  return {
    plan,
    limit: config.aiLimit,
    period: config.aiPeriod,
  };
};

const getUtcPeriodBounds = (period = "day", date = new Date()) => {
  const dayStart = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );

  if (period === "week") {
    const weekday = dayStart.getUTCDay();
    const shiftToMonday = (weekday + 6) % 7;
    const start = new Date(dayStart);
    start.setUTCDate(start.getUTCDate() - shiftToMonday);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 7);
    return { start, end };
  }

  const start = dayStart;
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start, end };
};

const getAIEligibility = async (mongoUserId, user, profileType) => {
  const { plan, limit, period } = getPlanDetails(user);
  const { start, end } = getUtcPeriodBounds(period);
  const [transactionCount, generatedInPeriod] = await Promise.all([
    Transaction.countDocuments({ userId: mongoUserId, profileType }),
    Insight.countDocuments({
      userId: mongoUserId,
      profileType,
      created_at: { $gte: start, $lt: end },
    }),
  ]);

  if (transactionCount < AI_MIN_TRANSACTION_COUNT) {
    return {
      canGenerate: false,
      plan,
      transactionCount,
      minimumRequired: AI_MIN_TRANSACTION_COUNT,
      generatedToday: generatedInPeriod,
      dailyLimit: limit,
      remainingToday: Math.max(0, limit - generatedInPeriod),
      period,
      periodLimit: limit,
      generatedInPeriod,
      remainingInPeriod: Math.max(0, limit - generatedInPeriod),
      message: `Add at least ${AI_MIN_TRANSACTION_COUNT} transactions before using AI insights. You currently have ${transactionCount}.`,
      reason: "insufficient_data",
    };
  }

  if (generatedInPeriod >= limit) {
    const periodLabel = period === "week" ? "weekly" : "daily";
    return {
      canGenerate: false,
      plan,
      transactionCount,
      minimumRequired: AI_MIN_TRANSACTION_COUNT,
      generatedToday: generatedInPeriod,
      dailyLimit: limit,
      remainingToday: 0,
      period,
      periodLimit: limit,
      generatedInPeriod,
      remainingInPeriod: 0,
      message: `You have reached your ${periodLabel} AI insight limit (${limit}/${limit}) for your ${plan} plan.`,
      reason: "period_limit_reached",
    };
  }

  const remaining = Math.max(0, limit - generatedInPeriod);
  return {
    canGenerate: true,
    plan,
    transactionCount,
    minimumRequired: AI_MIN_TRANSACTION_COUNT,
    generatedToday: generatedInPeriod,
    dailyLimit: limit,
    remainingToday: remaining,
    period,
    periodLimit: limit,
    generatedInPeriod,
    remainingInPeriod: remaining,
    message: `You can generate ${remaining} more AI insight${remaining === 1 ? "" : "s"} this ${period}.`,
    reason: null,
  };
};

/**
 * Transform dashboard data into AI-friendly financial context
 * Structures data for prompt injection into AI model
 */
const transformFinancialDataForAI = (dashboardData) => {
  const { summary, breakdown } = dashboardData;

  // Build top categories object
  const topCategories = {};
  breakdown.slice(0, 3).forEach((item) => {
    topCategories[item.category_name] = parseFloat(item.total);
  });

  return {
    total_income: parseFloat(summary.incomeThisMonth),
    total_expenses: parseFloat(summary.expenseThisMonth),
    savings_rate: summary.savingsRate,
    monthly_net: summary.monthlyNet,
    top_categories: topCategories,
    category_breakdown: breakdown.map((cat) => ({
      name: cat.category_name,
      amount: parseFloat(cat.total),
      count: cat.transaction_count,
    })),
  };
};

// ==========================================
// 📊 GET RECENT ANALYSES (Protected)
// ==========================================

export const getRecentAnalyses = async (req, res) => {
  try {
    const mongoUserId = getMongoUserId(req);
    if (!mongoUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch only insights for the authenticated user
    const insights = await Insight.find({
      userId: mongoUserId,
      profileType: req.profileType,
    }).sort({
      created_at: -1,
    });

    res.status(200).json(insights);
  } catch (error) {
    console.error("❌ Error fetching insights:", error.message);
    res.status(500).json({
      error: "Failed to extract historical analytics ledger.",
      details: error.message,
    });
  }
};

// ==========================================
// 🧠 GENERATE AI INSIGHT (Protected + Rate Limited)
// ==========================================

export const generateInsightExtended = async (req, res) => {
  const { type } = req.body;

  // Validate insight type
  const config = DEVELOPER_PROMPTS[type];
  if (!config) {
    return res.status(400).json({
      error: "Requested an invalid or unconfigured AI model type.",
    });
  }

  try {
    // 1️⃣ Extract & validate user ID
    const mongoUserId = getMongoUserId(req);
    if (!mongoUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const eligibility = await getAIEligibility(
      mongoUserId,
      req.user,
      req.profileType,
    );
    if (!eligibility.canGenerate) {
      return res.status(403).json({
        error: "AI insight generation unavailable",
        message: eligibility.message,
        eligibility,
      });
    }

    // 2️⃣ FETCH REAL USER FINANCIAL DATA
    const dashboardData = await getAIContextData(mongoUserId, req.profileType);

    // 3️⃣ Transform into AI-friendly format
    const financialData = transformFinancialDataForAI(dashboardData);

    // Log for debugging
    console.log(
      `📊 Generated AI context for user ${mongoUserId}:`,
      JSON.stringify(financialData, null, 2),
    );

    // 4️⃣ Call AI Model (Groq/Llama)
    const groq = getGroqClient();

    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: config.system },
        {
          role: "user",
          content: config.userTemplate(financialData),
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 800,
      temperature: type === "savings_tips" ? 0.6 : 0.2,
    });

    const parsedAIOutput = JSON.parse(response.choices[0].message.content);

    // 5️⃣ Save insight to database with user ID
    const recordedAnalysis = await Insight.create({
      userId: mongoUserId, // 🔑 Associate with user
      profileType: req.profileType,
      insight_type: type, // Use consistent naming
      content_json: parsedAIOutput, // Store structured AI output
      health_score: parsedAIOutput.health_score || 50,
      content: parsedAIOutput, // Legacy field (optional)
    });

    // 6️⃣ Return success response
    res.status(201).json({
      success: true,
      message: "Analysis compiled successfully.",
      metadata: {
        id: recordedAnalysis._id,
        generated_at: recordedAnalysis.created_at,
        user_id: mongoUserId,
      },
      data: recordedAnalysis.content_json,
    });
  } catch (error) {
    console.error("🔴 AI Pipeline Error:", error);
    res.status(500).json({
      error: "AI pipeline processing failed.",
      details: error.message,
    });
  }
};

export const getInsightEligibility = async (req, res) => {
  try {
    const mongoUserId = getMongoUserId(req);
    if (!mongoUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const eligibility = await getAIEligibility(
      mongoUserId,
      req.user,
      req.profileType,
    );
    res.status(200).json(eligibility);
  } catch (error) {
    console.error("❌ Error fetching AI eligibility:", error.message);
    res.status(500).json({
      error: "Failed to fetch AI eligibility.",
      details: error.message,
    });
  }
};

// ==========================================
// 📈 Optional: Get Cached Insight by Type
// ==========================================

export const getLatestInsightByType = async (req, res) => {
  try {
    const mongoUserId = getMongoUserId(req);
    if (!mongoUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { type } = req.params;

    const insight = await Insight.findOne({
      userId: mongoUserId,
      profileType: req.profileType,
      insight_type: type,
    }).sort({ created_at: -1 });

    if (!insight) {
      return res.status(200).json(null);
    }

    res.status(200).json(insight);
  } catch (error) {
    console.error("❌ Error fetching insight:", error.message);
    res.status(500).json({
      error: "Failed to fetch insight",
      details: error.message,
    });
  }
};
