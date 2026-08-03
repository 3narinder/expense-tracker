export const PROFILE_TYPES = {
  personal: "personal",
  business: "business",
};

const ACTIVE_PROFILE_STORAGE_KEY = "expenseai-active-profile";

export const normalizeProfileType = (value) => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return Object.values(PROFILE_TYPES).includes(normalized) ? normalized : null;
};

export const getActiveProfileType = () =>
  normalizeProfileType(localStorage.getItem(ACTIVE_PROFILE_STORAGE_KEY)) ||
  PROFILE_TYPES.personal;

export const setActiveProfileType = (value) => {
  const normalized = normalizeProfileType(value) || PROFILE_TYPES.personal;
  localStorage.setItem(ACTIVE_PROFILE_STORAGE_KEY, normalized);
  return normalized;
};
