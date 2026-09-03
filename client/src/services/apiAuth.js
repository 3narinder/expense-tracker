import api from "../utils/axios";
import { handleApiError } from "../utils/format";
import { clearAuthToken } from "../utils/authToken";

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
      return { user: null };
    }
    // Let React Query retry network / timeout errors (e.g. Render cold start).
    throw error;
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

export const updateActiveProfile = async (profileType) => {
  try {
    const res = await api.patch("/auth/active-profile", { profileType });
    return res.data;
  } catch (error) {
    handleApiError(error, "updateActiveProfile");
  }
};
