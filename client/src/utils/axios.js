import axios from "axios";
import { getAuthToken } from "./authToken";
import { getActiveProfileType } from "./profileScope";

// Use local API in development unless VITE_API_URL explicitly set
const defaultApiUrl = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || "http://localhost:8000/api")
  : (import.meta.env.VITE_API_URL || "https://expense-tracker-api-mkt0.onrender.com/api");

const API_URL = defaultApiUrl;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["x-profile-type"] = getActiveProfileType();
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login" &&
      !originalRequest?.url?.includes("/auth/me")
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
