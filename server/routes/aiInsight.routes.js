import express from "express";
import { testGenerate } from "../controllers/aiInsightController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/test", protect, testGenerate);

export default router;
