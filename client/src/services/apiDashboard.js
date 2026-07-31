import api from "../utils/axios";
import { handleApiError } from "../utils/format";

export const getMonthlySummary = async (accountId) => {
  try {
    const params = accountId ? { accountId } : {};
    const { data } = await api.get("/dashboard/month-summary", { params });
    return data;
  } catch (error) {
    handleApiError(error, "getMonthlySummary");
  }
};

export const getMonthlyTrends = async (accountId) => {
  try {
    const params = accountId ? { accountId } : {};
    const { data } = await api.get("/dashboard/month-trends", { params });
    return data;
  } catch (error) {
    handleApiError(error, "getMonthlyTrends");
  }
};

export const getCategoryBreakDown = async (accountId) => {
  try {
    const params = accountId ? { accountId } : {};
    const { data } = await api.get("/dashboard/category-breakdown", { params });
    return data;
  } catch (error) {
    handleApiError(error, "getCategoryBreakDown");
  }
};

export const getRecentTransactions = async (accountId) => {
  try {
    const params = accountId ? { accountId } : {};
    const { data } = await api.get("/transactions/recent", { params });
    return data;
  } catch (error) {
    handleApiError(error, "getRecentTransactions");
  }
};
