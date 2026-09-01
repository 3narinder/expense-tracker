import * as notificationService from "../services/notificationService.js";

export const listNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false, category } = req.query;
    const data = await notificationService.getNotifications(req.user._id, { page: Number(page), limit: Number(limit), unreadOnly: unreadOnly === 'true' || unreadOnly === true, category });
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const count = await notificationService.getUnreadCount(req.user._id);
    return res.json({ count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch unread count" });
  }
};

export const patchRead = async (req, res) => {
  try {
    const { id } = req.params;
    const n = await notificationService.markAsRead(req.user._id, id);
    if (!n) return res.status(404).json({ message: "Notification not found" });
    return res.json(n);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to mark as read" });
  }
};

export const patchReadAll = async (req, res) => {
  try {
    const r = await notificationService.markAllAsRead(req.user._id);
    return res.json({ modifiedCount: r.modifiedCount || r.nModified || 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to mark all as read" });
  }
};

export const removeNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const r = await notificationService.deleteNotification(req.user._id, id);
    if (!r) return res.status(404).json({ message: "Notification not found" });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete notification" });
  }
};

export const getPreferences = async (req, res) => {
  try {
    const prefs = await notificationService.getPreferences(req.user._id);
    return res.json(prefs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch preferences" });
  }
};

export const updatePreferences = async (req, res) => {
  try {
    const patch = req.body;
    const prefs = await notificationService.updatePreferences(req.user._id, patch);
    return res.json(prefs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update preferences" });
  }
};
