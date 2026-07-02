import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    //*A Multi-Category Budget needs an array so one budget (e.g. "Food & Fun") can track several categories at once.
    categoryIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "A budget must include at least one category",
      },
    },

    amount: {
      type: Number,
      required: true,
      min: [0.01, "Amount must be greater than 0"],
      set: (value) => Math.round(value * 100) / 100,
    },

    spent: {
      type: Number,
      default: 0,
      min: 0,
      set: (value) => Math.round(value * 100) / 100,
    },

    //* when the cached `spent` value was last reconciled against a fresh aggregation. Lets you spot budgets that have drifted or that the reconciliation job hasn't reached yet.
    lastReconciledAt: {
      type: Date,
      default: null,
    },

    period: {
      type: String,
      enum: ["weekly", "monthly", "quarterly"],
      default: "monthly",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },

    alertThreshold: {
      type: Number,
      min: 0,
      max: 100,
      default: 80,
    },

    isAlertSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

budgetSchema.index({ userId: 1, period: 1, startDate: 1 });
budgetSchema.index({ userId: 1, categoryIds: 1 });

export default mongoose.model("Budget", budgetSchema);
