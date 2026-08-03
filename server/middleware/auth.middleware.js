import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import { resolveProfileType } from "../utils/profileScope.js";

export const protect = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.token;
    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;
    const token = cookieToken || bearerToken;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    req.profileType = resolveProfileType(user, req.headers["x-profile-type"]);

    if (!req.profileType) {
      return res.status(400).json({
        message: "Invalid profile scope. Use personal or business.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
