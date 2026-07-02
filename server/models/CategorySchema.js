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

    //* Hierarchical categories (parent/child)
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },

    ancestors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

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

categorySchema.index({ userId: 1, name: 1, type: 1 }, { unique: true });

categorySchema.index({ "autoCategorizationRules.merchantKeywords": 1 });

//* Supports "all descendants of category X" queries via the materialized ancestors path.
categorySchema.index({ ancestors: 1 });

categorySchema.pre("save", async function (next) {
  if (this.autoCategorizationRules?.merchantKeywords) {
    this.autoCategorizationRules.merchantKeywords =
      this.autoCategorizationRules.merchantKeywords.map((kw) =>
        kw.toLowerCase().trim(),
      );
  }

  if (this.isModified("parentId")) {
    if (!this.parentId) {
      this.ancestors = [];
    } else {
      const parent = await this.constructor
        .findById(this.parentId)
        .select("ancestors _id");
      if (!parent) {
        return next(new Error("Parent category not found"));
      }
      if (
        parent._id.equals(this._id) ||
        parent.ancestors.some((a) => a.equals(this._id))
      ) {
        return next(new Error("Circular category hierarchy is not allowed"));
      }
      this.ancestors = [...parent.ancestors, parent._id];
    }
  }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
