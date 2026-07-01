import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "Amount must be greater than 0"],
      set: (value) => Math.round(value * 100) / 100,
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

//* Updated index to handle the quarterly period
budgetSchema.index(
  { userId: 1, categoryId: 1, period: 1, startDate: 1 },
  { unique: true },
);

export default mongoose.model("Budget", budgetSchema);
