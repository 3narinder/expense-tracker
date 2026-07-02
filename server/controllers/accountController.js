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

//* @desc    Create new account
export const createAccount = async (req, res) => {
  try {
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
