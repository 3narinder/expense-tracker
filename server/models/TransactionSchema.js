import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
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
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 255,
      default: "",
    },

    merchant: {
      type: String,
      trim: true,
      maxLength: 150,
      default: "",
    },
    // NEW: Tags & Notes
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    notes: {
      type: String,
      trim: true,
      maxLength: 1000,
      default: "",
    },
    transactionDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    // NEW: Recurring logic
    recurring: {
      type: Boolean,
      default: false,
    },
    recurringFrequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly", null],
      default: null,
    },
    nextOccurrence: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

//* --- INDEXES FOR PERFORMANCE ---  Existing index for default dashboard fetching

transactionSchema.index({ userId: 1, transactionDate: -1 });

//* New indexes to support fast filtering, budget calculation, and cron jobs
transactionSchema.index({ userId: 1, categoryId: 1 }); //* Speeds up budget calculations
transactionSchema.index({ userId: 1, accountId: 1 }); //* Speeds up wallet-specific views
transactionSchema.index({ userId: 1, merchant: 1 }); //* Speeds up auto-categorization rule execution
transactionSchema.index({ recurring: 1, nextOccurrence: 1 }); //* Crucial for backend cron job fetching upcoming bills

export default mongoose.model("Transaction", transactionSchema);
