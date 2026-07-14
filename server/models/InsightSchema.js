import mongoose from "mongoose";

const InsightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    insight_type: {
      type: String,
      enum: ["monthly_summary", "savings_tips", "budget_alert"],
      required: true,
      index: true,
    },

    content_json: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    health_score: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
    },

    created_at: {
      type: Date,
      default: Date.now,
      index: true, // Fast sorting by date
    },

    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // We handle timestamps manually
    collection: "insights", // Explicit collection name
  },
);

// **==========================================
//** 🔍 INDEXES FOR PERFORMANCE
// **==========================================

// Single indexes
InsightSchema.index({ userId: 1 });
InsightSchema.index({ insight_type: 1 });
InsightSchema.index({ created_at: -1 });

// Compound indexes for common queries
InsightSchema.index({ userId: 1, created_at: -1 }); // Get user's recent insights
InsightSchema.index({ userId: 1, insight_type: 1, created_at: -1 });
InsightSchema.index({ health_score: 1 });

//** ==========================================
//**  METHODS
//** ==========================================

InsightSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return {
    id: obj._id,
    userId: obj.userId,
    insight_type: obj.insight_type,
    health_score: obj.health_score,
    content_json: obj.content_json,
    created_at: obj.created_at,
  };
};

InsightSchema.methods.belongsToUser = function (userId) {
  return this.userId.toString() === userId.toString();
};

// ==========================================
// 🔧 STATICS
// ==========================================

InsightSchema.statics.getLatestByType = async function (userId, type) {
  return this.findOne({
    userId,
    insight_type: type,
  }).sort({ created_at: -1 });
};

InsightSchema.statics.getByUser = async function (userId, limit = 50) {
  return this.find({ userId }).sort({ created_at: -1 }).limit(limit);
};

InsightSchema.statics.getByUserAndType = async function (userId, type) {
  return this.find({
    userId,
    insight_type: type,
  }).sort({ created_at: -1 });
};

InsightSchema.statics.deleteByUser = async function (userId) {
  return this.deleteMany({ userId });
};

// ==========================================
// 🚨 MIDDLEWARE
// ==========================================

InsightSchema.pre("save", function () {
  this.updated_at = new Date();
});

InsightSchema.pre("save", function () {
  if (this.userId && !this.userId.toString().match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid userId format");
  }
});

export default mongoose.model("Insight", InsightSchema);
