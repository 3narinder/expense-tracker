import axios from "axios";
import { getAuthToken } from "./authToken";
import { getActiveProfileType } from "./profileScope";

// Resolve API URL precedence:
// 1. VITE_API_URL (explicit)
// 2. If running Vite in dev (import.meta.env.DEV) use local backend
// 3. Otherwise use production URL
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8000/api" : "https://expense-tracker-api-mkt0.onrender.com/api");

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  // Render free tier can take 30s+ on cold start; 10s caused false logouts on mobile.
  timeout: import.meta.env.DEV ? 10000 : 45000,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["x-profile-type"] = getActiveProfileType();
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default api;
