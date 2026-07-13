import express from "express";
import {
  getRecentAnalyses,
  generateInsightExtended,
} from "../controllers/aiInsightController.js";
import { protect } from "../middleware/auth.middleware.js";
import { aiRateLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

router.post("/recent", protect, getRecentAnalyses);

router.post("/generate", aiRateLimiter, generateInsightExtended);

export default router;
