const AUTH_TOKEN_KEY = "expenseai_access_token";
let inMemoryToken = null;

const canUseStorage = () => {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
};

export const setAuthToken = (token) => {
  if (!token) return;
  inMemoryToken = token;
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch {
    // Safari private mode / restricted environments can reject storage writes.
  }
};

export const getAuthToken = () => {
  if (inMemoryToken) return inMemoryToken;
  if (!canUseStorage()) return null;
  try {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const clearAuthToken = () => {
  inMemoryToken = null;
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    // Ignore storage clear failures in restricted browser modes.
  }
};
