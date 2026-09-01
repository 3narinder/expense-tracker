import mongoose from "mongoose";

const notifPrefSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    // enable/disable high level categories
    enabled: {
      recurring: { type: Boolean, default: true },
      budgetWarnings: { type: Boolean, default: true },
      budgetExceeded: { type: Boolean, default: true },
      upcomingPayments: { type: Boolean, default: true },
      subscriptionRenewals: { type: Boolean, default: true },
      unusualExpenses: { type: Boolean, default: true },
      weeklySummary: { type: Boolean, default: true },
      monthlySummary: { type: Boolean, default: true },
      savingsMilestones: { type: Boolean, default: true },
      expenseReminders: { type: Boolean, default: false },
      securityAlerts: { type: Boolean, default: true },
    },
    // thresholds and configurable options
    thresholds: {
      budgetWarning: { type: Number, default: 90 }, // percent for "warning"
      budgetInfo: { type: Number, default: 75 },
      largeExpenseMultiplier: { type: Number, default: 3 }, // expense > avg * multiplier => unusual
      spendingIncreasePercent: { type: Number, default: 20 },
      recurringReminderDays: { type: [Number], default: [1] }, // days before
    },
  },
  { timestamps: true }
);

export default mongoose.model("NotificationPreference", notifPrefSchema);
