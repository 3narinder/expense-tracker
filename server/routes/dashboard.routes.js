import express from "express";

import {
  getCategoryBreakdown,
  getMonthlyTrends,
  getMonthSummary,
} from "../controllers/dashboardController.js";

//* Protect the routes
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

//* Applying protection in all routes in this routes
router.use(protect);

router.get("/month-summary", getMonthSummary);
router.get("/month-trends", getMonthlyTrends);
router.get("/category-breakdown", getCategoryBreakdown);

export default router;
