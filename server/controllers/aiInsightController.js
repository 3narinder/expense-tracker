import Insight from "../models/InsightSchema.js";
import { DEVELOPER_PROMPTS } from "../utils/Prompt.js";
import { getGroqClient } from "../utils/groq.js"; // Import our safe getter

const MODEL = "llama-3.3-70b-versatile";

const DUMMY_FINANCIAL_DATA = {
  total_income: 5400,
  total_expenses: 3950,
  savings_rate: 26,
  top_categories: { Dining: 850, Groceries: 600, Subscriptions: 150 },
};

export const getRecentAnalyses = async (req, res) => {
  try {
    const insights = await Insight.find().sort({ created_at: -1 });
    res.status(200).json(insights);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to extract historical analytics ledger." });
  }
};

export const generateInsightExtended = async (req, res) => {
  const { type } = req.body;

  const config = DEVELOPER_PROMPTS[type];
  if (!config) {
    return res
      .status(400)
      .json({ error: "Requested an invalid or unconfigured AI model type." });
  }

  try {
    const groq = getGroqClient();

    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: config.system },
        { role: "user", content: config.userTemplate(DUMMY_FINANCIAL_DATA) },
      ],
      response_format: { type: "json_object" },
      max_tokens: 800,
      temperature: 0.2,
    });

    const parsedAIOutput = JSON.parse(response.choices[0].message.content);

    const recordedAnalysis = await Insight.create({
      type: type,
      health_score: parsedAIOutput.health_score || 50,
      content: parsedAIOutput,
    });

    res.status(201).json({
      success: true,
      message: "Analysis compiled successfully.",
      metadata: {
        id: recordedAnalysis._id,
        generated_at: recordedAnalysis.created_at,
      },
      data: recordedAnalysis.content,
    });
  } catch (error) {
    console.error("🔴 Architectural failure:", error);
    res.status(500).json({
      error: "AI pipeline processing failed.",
      details: error.message,
    });
  }
};
