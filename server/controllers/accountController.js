import Account from "../models/AccountSchema.js";
import { getPlanConfig } from "../utils/planConfig.js";

//* @desc    Get all accounts for user
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({
      userId: req.user.id,
      profileType: req.profileType,
    });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* @desc    Create new account (premium feature — basic users may only hold their default Personal Wallet)
export const createAccount = async (req, res) => {
  try {
    const plan = req.user.subscriptionPlan || "basic";
    const config = getPlanConfig(plan);

    if (
      req.profileType === "business" &&
      config.canCreateBusinessAccount !== true
    ) {
      return res.status(403).json({
        message:
          "Your current plan allows personal accounts only. Upgrade to create business accounts.",
        code: "PREMIUM_REQUIRED",
      });
    }

    const [totalCount, personalCount, businessCount] = await Promise.all([
      Account.countDocuments({ userId: req.user.id }),
      Account.countDocuments({ userId: req.user.id, profileType: "personal" }),
      Account.countDocuments({ userId: req.user.id, profileType: "business" }),
    ]);

    if (totalCount >= config.maxAccounts) {
      return res.status(403).json({
        message: `Upgrade to create more accounts. Your ${plan} plan allows up to ${config.maxAccounts} accounts.`,
        code: "PREMIUM_REQUIRED",
      });
    }

    if (
      req.profileType === "personal" &&
      personalCount >= config.maxPersonalAccounts
    ) {
      return res.status(403).json({
        message:
          "Your current plan does not allow more personal accounts. Upgrade to continue.",
        code: "PREMIUM_REQUIRED",
      });
    }

    if (
      req.profileType === "business" &&
      businessCount >= config.maxBusinessAccounts
    ) {
      return res.status(403).json({
        message:
          "Your current plan has reached its business-account limit. Upgrade to continue.",
        code: "PREMIUM_REQUIRED",
      });
    }

    const { name, type, balance, currency } = req.body;
    const account = await Account.create({
      userId: req.user.id,
      profileType: req.profileType,
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
      { _id: id, userId: req.user.id, profileType: req.profileType },
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
      profileType: req.profileType,
    });
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
