import api from "../utils/axios";
import { handleApiError } from "../utils/format";

export const getNotifications = async ({ page = 1, limit = 50, unreadOnly = false } = {}) => {
  try {
    const res = await api.get(`/notifications?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`);
    return res.data;
  } catch (err) {
    handleApiError(err, "getNotifications");
  }
};

export const getUnreadCount = async () => {
  try {
    const res = await api.get(`/notifications/unread-count`);
    return res.data;
  } catch (err) {
    handleApiError(err, "getUnreadCount");
  }
};

export const markAsRead = async (id) => {
  try {
    const res = await api.patch(`/notifications/${id}/read`);
    return res.data;
  } catch (err) {
    handleApiError(err, "markAsRead");
  }
};

export const markAllAsRead = async () => {
  try {
    const res = await api.patch(`/notifications/read-all`);
    return res.data;
  } catch (err) {
    handleApiError(err, "markAllAsRead");
  }
};

export const deleteNotification = async (id) => {
  try {
    const res = await api.delete(`/notifications/${id}`);
    return res.data;
  } catch (err) {
    handleApiError(err, "deleteNotification");
  }
};

export const getPreferences = async () => {
  try {
    const res = await api.get(`/notifications/preferences`);
    return res.data;
  } catch (err) {
    handleApiError(err, "getNotificationPreferences");
  }
};

export const updatePreferences = async (patch) => {
  try {
    const res = await api.patch(`/notifications/preferences`, patch);
    return res.data;
  } catch (err) {
    handleApiError(err, "updateNotificationPreferences");
  }
};
