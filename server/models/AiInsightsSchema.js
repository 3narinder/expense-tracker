import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    insightType: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },

    periodStart: {
      type: Date,
    },

    periodEnd: {
      type: Date,
    },

    contentJson: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AIInsight = mongoose.model("AIInsight", aiInsightSchema);

export default AIInsight;
