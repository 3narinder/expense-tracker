import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: [true, "Budget name is required"],
      trim: true,
      minlength: [3, "Budget name must be at least 3 characters"],
      maxlength: [100, "Budget name cannot exceed 100 characters"],
    },

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
