import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

      required: function () {
        return !this.isDefault;
      },
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: "#3B82F6",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },

    autoCategorizationRules: {
      merchantKeywords: [
        {
          type: String,
          trim: true,
          lowercase: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

//* Prevent duplicate category names of the same type for a user
categorySchema.index({ userId: 1, name: 1, type: 1 }, { unique: true });

//* NEW INDEX: Performance for auto-categorization ----- Allows searching for a category based on a merchant name during transaction creation
categorySchema.index({ "autoCategorizationRules.merchantKeywords": 1 });

categorySchema.pre("save", function (next) {
  if (this.autoCategorizationRules?.merchantKeywords) {
    this.autoCategorizationRules.merchantKeywords =
      this.autoCategorizationRules.merchantKeywords.map((kw) =>
        kw.toLowerCase().trim(),
      );
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
