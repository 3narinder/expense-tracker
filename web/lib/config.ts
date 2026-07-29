export const SITE_URL = "https://expenseai.app";
export const APP_URL =
  process.env.NODE_ENV === "production"
    ? "https://expense-tracker-ten-amber-28.vercel.app"
    : "http://localhost:5173";
export const LOGIN_URL = `${APP_URL}/login`;
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://expense-tracker-api-mkt0.onrender.com/api"
    : "http://localhost:8000/api";
export const GITHUB_URL = "https://github.com/3narinder/expense-tracker";
export const APP_NAME = "ExpenseAI";
