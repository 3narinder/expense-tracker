import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { updateSubscriptionPlan } from "../controllers/userController.js";

const router = express.Router();

router.patch("/subscription-plan", protect, updateSubscriptionPlan);

export default router;

