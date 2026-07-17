import api from "./api";

export interface MonthlySummary {
  balance: number;
  monthlyNet: number;
  incomeThisMonth: number;
  expenseThisMonth: number;
  savingsRate: number;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
}

export interface CategoryBreakdown {
  category_name: string;
  amount: number;
  percentage: number;
  category_color: string;
  category_icon: string;
}

export interface RecentTransaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  transaction_date: string;
  category_name: string;
  category_icon: string;
  category_color: string;
}

export const getMonthlySummary = async (): Promise<MonthlySummary> => {
  const { data } = await api.get("/dashboard/month-summary");
  return data;
};

export const getMonthlyTrends = async (): Promise<MonthlyTrend[]> => {
  const { data } = await api.get("/dashboard/month-trends");
  return data;
};

export const getCategoryBreakdown = async (): Promise<CategoryBreakdown[]> => {
  const { data } = await api.get("/dashboard/category-breakdown");
  return data;
};

export const getRecentTransactions = async (): Promise<RecentTransaction[]> => {
  const { data } = await api.get("/transactions/recent");
  return data;
};
