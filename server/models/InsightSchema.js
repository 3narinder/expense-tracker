import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  // You can easily add properties here later (e.g., userId: { type: String })
  type: {
    type: String,
    enum: ["monthly_summary", "savings_tips"],
    required: true,
  },
  health_score: {
    type: Number,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Insight", insightSchema);
