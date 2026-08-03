import express from "express";
import {
  register,
  login,
  getMe,
  logout,
  setActiveProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);
router.patch("/active-profile", protect, setActiveProfile);

export default router;
