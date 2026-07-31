import { useQuery } from "@tanstack/react-query";
import {
  getMonthlySummary,
  getMonthlyTrends,
  getCategoryBreakDown,
  getRecentTransactions,
} from "../../services/apiDashboard";

export const useDashboardData = (accountId = null) => {
  const summaryQuery = useQuery({
    queryKey: ["summary", accountId],
    queryFn: () => getMonthlySummary(accountId),
  });

  const trendsQuery = useQuery({
    queryKey: ["trends", accountId],
    queryFn: () => getMonthlyTrends(accountId),
  });

  const categoryBreakDownQuery = useQuery({
    queryKey: ["category-breakdown", accountId],
    queryFn: () => getCategoryBreakDown(accountId),
  });

  const getRecentTransactionsQuery = useQuery({
    queryKey: ["transaction", accountId],
    queryFn: () => getRecentTransactions(accountId),
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
            monthlyNet: 0,
          }
        : undefined),
    monthTrends: trendsQuery.data || [],
    categoryBreakDown: categoryBreakDownQuery.data || [],
    recentTransactions: getRecentTransactionsQuery.data || [],
  };
};
