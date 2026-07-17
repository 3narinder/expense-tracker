import { useQuery } from "@tanstack/react-query";
import {
  getMonthlySummary,
  getMonthlyTrends,
  getCategoryBreakdown,
  getRecentTransactions,
} from "../services/apiDashboard";

export const useDashboardData = () => {
  const monthSummaryQuery = useQuery({
    queryKey: ["dashboard", "monthSummary"],
    queryFn: getMonthlySummary,
  });

  const monthTrendsQuery = useQuery({
    queryKey: ["dashboard", "monthTrends"],
    queryFn: getMonthlyTrends,
  });

  const categoryBreakdownQuery = useQuery({
    queryKey: ["dashboard", "categoryBreakdown"],
    queryFn: getCategoryBreakdown,
  });

  const recentTransactionsQuery = useQuery({
    queryKey: ["dashboard", "recentTransactions"],
    queryFn: getRecentTransactions,
  });

  return {
    monthSummary: monthSummaryQuery.data,
    monthTrends: monthTrendsQuery.data || [],
    categoryBreakDown: categoryBreakdownQuery.data || [],
    recentTransactions: recentTransactionsQuery.data || [],
    isPending:
      monthSummaryQuery.isPending ||
      monthTrendsQuery.isPending ||
      categoryBreakdownQuery.isPending ||
      recentTransactionsQuery.isPending,
    error:
      monthSummaryQuery.error ||
      monthTrendsQuery.error ||
      categoryBreakdownQuery.error ||
      recentTransactionsQuery.error,
  };
};
