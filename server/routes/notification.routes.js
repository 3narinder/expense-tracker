import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import * as ctrl from "../controllers/notificationController.js";

const router = express.Router();

router.use(protect);

router.get("/", ctrl.listNotifications);
router.get("/unread-count", ctrl.getUnreadCount);
router.patch("/:id/read", ctrl.patchRead);
router.patch("/read-all", ctrl.patchReadAll);
router.delete("/:id", ctrl.removeNotification);

// preferences
router.get("/preferences", ctrl.getPreferences);
router.patch("/preferences", ctrl.updatePreferences);

export default router;
