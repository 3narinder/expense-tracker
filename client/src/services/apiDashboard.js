import api from "../utils/axios";
import { handleApiError } from "../utils/format";

export const getMonthlySummary = async () => {
  try {
    const { data } = await api.get("/dashboard/month-summary");
    return data;
  } catch (error) {
    handleApiError(error, "getMonthlySummary");
  }
};

export const getMonthlyTrends = async () => {
  try {
    const { data } = await api.get("/dashboard/month-trends");
    return data;
  } catch (error) {
    handleApiError(error, "getMonthlyTrends");
  }
};

export const getCategoryBreakDown = async () => {
  try {
    const { data } = await api.get("/dashboard/category-breakdown");
    return data;
  } catch (error) {
    handleApiError(error, "getCategoryBreakDown");
  }
};

export const getRecentTransactions = async () => {
  try {
    const { data } = await api.get("/transactions/recent");
    return data;
  } catch (error) {
    handleApiError(error, "getRecentTransactions");
  }
};
