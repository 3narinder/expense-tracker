import api from "../utils/axios";
import { handleApiError } from "../utils/format";

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
      return null;
    }
    handleApiError(error, "getMe");
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    handleApiError(error, "logout");
  }
};
