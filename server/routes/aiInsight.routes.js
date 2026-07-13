import express from "express";
import {
  getRecentAnalyses,
  generateInsightExtended,
  getLatestInsightByType,
} from "../controllers/aiInsightController.js";
import { protect } from "../middleware/auth.middleware.js";
import { aiRateLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

// ==========================================
// 🔒 ALL ROUTES ARE PROTECTED
// ==========================================

router.get("/recent", protect, getRecentAnalyses);

router.post("/generate", protect, aiRateLimiter, generateInsightExtended);

router.get("/latest/:type", protect, getLatestInsightByType);

export default router;
