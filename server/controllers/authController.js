import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/UserSchema.js";
import Account from "../models/AccountSchema.js";

//** Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//** Set HTTP Only Cookie
const sendToken = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

//** @route POST /api/auth/register
export const register = async (req, res) => {
  const { username, email, password, currency } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email and password are required.",
    });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: "Email already registered." });
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.status(400).json({ message: "Username already taken." });
  }

  const session = await mongoose.startSession();
  try {
    let user;

    await session.withTransaction(async () => {
      //* 1. Create the user profile
      user = await User.create(
        [{ username, email, passwordHash: password, currency }],
        { session },
      );
      user = user[0]; // create() with an array + session returns an array

      //* 2. Automatically spin up their default "Personal Wallet" account
      await Account.create(
        [
          {
            userId: user._id,
            name: "Personal Wallet",
            type: "cash",
            balance: 0,
            currency: user.currency || "INR",
          },
        ],
        { session },
      );
    });

    const token = generateToken(user._id);
    sendToken(res, token);

    return res.status(201).json({ success: true, user });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      return res.status(400).json({
        message: `That ${field} is already registered.`,
      });
    }

    console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
  } finally {
    await session.endSession();
  }
};

//** @route POST /api/auth/login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email }).select("+passwordHash");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    sendToken(res, token);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

//** @route GET /api/auth/me

export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

//** @route POST /api/auth/logout
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};
