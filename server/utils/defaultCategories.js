import Category from "../models/CategorySchema.js";

const defaultCategories = [
  {
    name: "Uncategorized",
    type: "expense",
    icon: "Archive",
    color: "#71717a",
  },
  {
    name: "Salary",
    type: "income",
    icon: "DollarSign",
    color: "#22c55e",
  },
  {
    name: "Freelance",
    type: "income",
    icon: "Briefcase",
    color: "#38bdf8",
  },
  {
    name: "Rent",
    type: "expense",
    icon: "Home",
    color: "#fb7185",
  },
  {
    name: "Utilities",
    type: "expense",
    icon: "Zap",
    color: "#f59e0b",
  },
  {
    name: "Groceries",
    type: "expense",
    icon: "ShoppingCart",
    color: "#10b981",
  },
  {
    name: "Food & Dining",
    type: "expense",
    icon: "Coffee",
    color: "#8b5cf6",
  },
  {
    name: "Transportation",
    type: "expense",
    icon: "Truck",
    color: "#0ea5e9",
  },
  {
    name: "Entertainment",
    type: "expense",
    icon: "Music",
    color: "#f472b6",
  },
];

export const ensureDefaultCategories = async () => {
  try {
    const missing = [];

    for (const category of defaultCategories) {
      const existing = await Category.findOne({
        name: category.name,
        type: category.type,
        isDefault: true,
      });

      if (!existing) {
        missing.push(category);
      }
    }

    if (missing.length > 0) {
      await Category.insertMany(
        missing.map((category) => ({
          ...category,
          isDefault: true,
        })),
      );
      console.log(
        `✅ Seeded ${missing.length} missing default category(ies): ${missing
          .map((c) => c.name)
          .join(", ")}`,
      );
    }

    return true;
  } catch (error) {
    console.error("Failed to ensure default categories:", error.message);
    throw error;
  }
};
