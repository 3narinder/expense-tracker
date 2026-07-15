import api from "../utils/axios";
import { handleApiError } from "../utils/format";

const AUTH_TOKEN_KEY = "expenseai_access_token";

export const setAuthToken = (token) => {
  if (!token) return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const register = async (formData) => {
  try {
    const res = await api.post("/auth/register", formData);
    return res.data;
  } catch (error) {
    handleApiError(error, "register");
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    handleApiError(error, "login");
  }
};

export const getMe = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error) {
    if (error.response?.status === 401) {
      clearAuthToken();
      return null;
    }
    handleApiError(error, "getMe");
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    if (error.response?.status === 401) return;
    handleApiError(error, "logout");
  }
};
