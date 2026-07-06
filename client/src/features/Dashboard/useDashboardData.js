import { useQuery } from "@tanstack/react-query";
import {
  getMonthlySummary,
  getMonthlyTrends,
  getCategoryBreakDown,
  getRecentTransactions,
} from "../../services/apiDashboard";

export const useDashboardData = () => {
  const summaryQuery = useQuery({
    queryKey: ["summary"],
    queryFn: getMonthlySummary,
  });

  const trendsQuery = useQuery({
    queryKey: ["trends"],
    queryFn: getMonthlyTrends,
  });

  const categoryBreakDownQuery = useQuery({
    queryKey: ["category-breakdown"],
    queryFn: getCategoryBreakDown,
  });

  const getRecentTransactionsQuery = useQuery({
    queryKey: ["transaction"],
    queryFn: getRecentTransactions,
  });

  const isPending = summaryQuery.isPending || trendsQuery.isPending;

  const error = summaryQuery.error || trendsQuery.error;

  return {
    isPending,
    error,
    monthSummary:
      summaryQuery.data ||
      (summaryQuery.isError
        ? {
            balance: 0,
            incomeThisMonth: 0,
            expenseThisMonth: 0,
            savingsRate: 0,
          }
        : undefined),

    monthTrends: trendsQuery.data || [],
    categoryBreakDown: categoryBreakDownQuery.data || [],
    recentTransactions: getRecentTransactionsQuery.data || [],
  };
};
