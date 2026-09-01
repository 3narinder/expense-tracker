import Notification from "../models/NotificationSchema.js";
import NotificationPreference from "../models/NotificationPreferenceSchema.js";

/**
 * Create notification with deduplication.
 * dedupKey: a stable key representing the condition (e.g. `budget:${budgetId}:threshold:90:period:YYYY-MM`)
 * If a non-expired notification with the same dedupKey exists, return it instead of creating a new one.
 */
export const createNotification = async ({ userId, type, title, message, priority = "MEDIUM", category = "general", actionUrl = null, metadata = {}, expiresAt = null, dedupKey = null, referenceId = null }) => {
  if (dedupKey) {
    const existing = await Notification.findOne({ userId, dedupKey, isRead: false }).sort({ createdAt: -1 });
    if (existing) return existing;
  }

  const n = new Notification({ userId, type, title, message, priority, category, actionUrl, metadata, expiresAt, dedupKey, referenceId });
  await n.save();
  return n;
};

export const getNotifications = async (userId, { page = 1, limit = 20, unreadOnly = false, category = null } = {}) => {
  const q = { userId };
  if (unreadOnly) q.isRead = false;
  if (category) q.category = category;

  const skip = (page - 1) * limit;
  const items = await Notification.find(q).sort({ createdAt: -1 }).skip(skip).limit(limit);
  const total = await Notification.countDocuments(q);
  return { items, total, page, limit };
};

export const getUnreadCount = async (userId) => {
  return Notification.countDocuments({ userId, isRead: false });
};

export const markAsRead = async (userId, notificationId) => {
  const n = await Notification.findOneAndUpdate({ _id: notificationId, userId }, { isRead: true, readAt: new Date() }, { new: true });
  return n;
};

export const markAllAsRead = async (userId) => {
  const res = await Notification.updateMany({ userId, isRead: false }, { isRead: true, readAt: new Date() });
  return res;
};

export const deleteNotification = async (userId, notificationId) => {
  const res = await Notification.findOneAndDelete({ _id: notificationId, userId });
  return res;
};

export const getPreferences = async (userId) => {
  let prefs = await NotificationPreference.findOne({ userId });
  if (!prefs) {
    prefs = new NotificationPreference({ userId });
    await prefs.save();
  }
  return prefs;
};

export const updatePreferences = async (userId, patch = {}) => {
  const prefs = await NotificationPreference.findOneAndUpdate({ userId }, { $set: patch }, { new: true, upsert: true });
  return prefs;
};
