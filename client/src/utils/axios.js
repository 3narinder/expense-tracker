import axios from "axios";

const defaultApiUrl = import.meta.env.PROD
  ? "https://expense-tracker-api-mkt0.onrender.com/api"
  : "http://localhost:8000/api";

const API_URL = import.meta.env.VITE_API_URL || defaultApiUrl;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login" &&
      !originalRequest.url.includes("/auth/me")
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
