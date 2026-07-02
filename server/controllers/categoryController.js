import mongoose from "mongoose";
import Category from "../models/CategorySchema.js";
import Transaction from "../models/TransactionSchema.js";

//* @desc    Get both default and user-specific categories
//* @route   GET /api/categories

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      $or: [{ isDefault: true }, { userId: req.user.id }],
    }).sort({ type: 1, name: 1 });

    const formattedCategories = categories.map((cat) => ({
      id: cat._id,
      name: cat.name,
      type: cat.type,
      icon: cat.icon,
      color: cat.color,
      isDefault: cat.isDefault,
      parentId: cat.parentId, // NEW
      ancestors: cat.ancestors, // NEW
    }));

    res.status(200).json(formattedCategories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

//* @desc    Create a custom category for a user
//* @route   POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name, type, icon, color, autoCategorizationRules, parentId } =
      req.body;

    if (parentId) {
      const parent = await Category.findOne({
        _id: parentId,
        $or: [{ isDefault: true }, { userId: req.user.id }],
      });
      if (!parent) {
        return res
          .status(400)
          .json({ message: "Parent category not found or unauthorized" });
      }
      if (parent.type !== type) {
        return res
          .status(400)
          .json({ message: "Child category type must match parent type" });
      }
    }

    const category = new Category({
      userId: req.user.id,
      name,
      type,
      icon,
      color,
      isDefault: false,
      autoCategorizationRules,
      parentId: parentId || null,
    });

    await category.save();
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(400)
        .json({ message: "Duplicate category name for this type." });
    res.status(500).json({ message: error.message });
  }
};

//* @desc    Update a custom category
//* @route   PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, color, autoCategorizationRules, parentId } = req.body;

    const category = await Category.findOne({
      _id: id,
      userId: req.user.id,
      isDefault: false,
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found or unauthorized." });
    }

    if (parentId !== undefined) {
      if (parentId) {
        const parent = await Category.findOne({
          _id: parentId,
          $or: [{ isDefault: true }, { userId: req.user.id }],
        });
        if (!parent) {
          return res
            .status(400)
            .json({ message: "Parent category not found or unauthorized" });
        }
        if (parent.type !== category.type) {
          return res
            .status(400)
            .json({ message: "Child category type must match parent type" });
        }
      }
      category.parentId = parentId || null;
    }

    if (name !== undefined) category.name = name;
    if (icon !== undefined) category.icon = icon;
    if (color !== undefined) category.color = color;
    if (autoCategorizationRules !== undefined) {
      category.autoCategorizationRules = autoCategorizationRules;
    }

    await category.save();

    res.status(200).json({ message: "Updated successfully", category });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate category name for this type." });
    }
    res.status(500).json({ message: error.message });
  }
};

//* @desc    Delete a custom category
//* @route   DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const category = await Category.findOne({
      _id: id,
      userId: userId,
      isDefault: false,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found or you cannot delete system defaults.",
      });
    }

    const fallbackCategory = await Category.findOne({
      name: "Uncategorized",
      isDefault: true,
    });

    if (!fallbackCategory) {
      return res
        .status(500)
        .json({ message: "Fallback category missing in database." });
    }

    await Transaction.updateMany(
      { userId: userId, categoryId: id },
      { $set: { categoryId: fallbackCategory._id } },
    );

    await category.deleteOne();

    res.status(200).json({
      message:
        "Category deleted successfully. Transactions moved to Uncategorized.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};
