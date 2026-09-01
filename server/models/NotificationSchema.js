import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "RECURRING_EXPENSE_DUE",
        "BUDGET_WARNING",
        "BUDGET_EXCEEDED",
        "UPCOMING_PAYMENT",
        "SUBSCRIPTION_RENEWAL",
        "UNUSUAL_EXPENSE",
        "SPENDING_INCREASE",
        "SPENDING_DECREASE",
        "WEEKLY_SUMMARY",
        "MONTHLY_SUMMARY",
        "BUDGET_SUCCESS",
        "SAVINGS_MILESTONE",
        "EXPENSE_REMINDER",
        "BUDGET_SETUP_REMINDER",
        "SECURITY_ALERT",
      ],
    },
    title: { type: String, required: true },
    message: { type: String, default: "" },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },
    category: { type: String, default: "general" },
    isRead: { type: Boolean, default: false, index: true },
    createdAt: { type: Date, default: Date.now, index: true },
    readAt: { type: Date, default: null },
    actionUrl: { type: String, default: null },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    expiresAt: { type: Date, default: null, index: true },
    // deduplication key to prevent duplicate notifications for the same condition
    dedupKey: { type: String, default: null, index: true },
    // optional reference to the related resource (budget, transaction, subscription, etc.)
    referenceId: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

// compound index for fast user queries
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

export default mongoose.model("Notification", notificationSchema);
