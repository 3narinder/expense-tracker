import Account from "../models/AccountSchema.js";

//* @desc    Get all accounts for user
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* @desc    Create new account (premium feature — basic users may only hold their default Personal Wallet)
export const createAccount = async (req, res) => {
  try {
    const plan = req.user.aiInsightPlan || "basic";

    if (plan === "basic") {
      const existingCount = await Account.countDocuments({
        userId: req.user.id,
      });
      if (existingCount >= 1) {
        return res.status(403).json({
          message:
            "Upgrade to a Premium plan to create additional accounts.",
          code: "PREMIUM_REQUIRED",
        });
      }
    }

    const { name, type, balance, currency } = req.body;
    const account = await Account.create({
      userId: req.user.id,
      name,
      type,
      balance,
      currency,
    });
    res.status(201).json(account);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "An account with that name already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

//* @desc    Update account
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, type, balance, currency } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (type !== undefined) updates.type = type;
    if (balance !== undefined) updates.balance = balance;
    if (currency !== undefined) updates.currency = currency;

    const account = await Account.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: updates },
      { new: true, runValidators: true },
    );
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* @desc    Delete account
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
