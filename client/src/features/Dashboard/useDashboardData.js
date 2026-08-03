import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getMonthlySummary,
  getMonthlyTrends,
  getCategoryBreakDown,
  getRecentTransactions,
} from "../../services/apiDashboard";
import { useProfileType } from "../Authentication/useActiveProfile.js";

export const useDashboardData = (accountId = null) => {
  const profileType = useProfileType();

  const summaryQuery = useQuery({
    queryKey: ["summary", profileType, accountId],
    queryFn: () => getMonthlySummary(accountId),
    placeholderData: keepPreviousData,
  });

  const trendsQuery = useQuery({
    queryKey: ["trends", profileType, accountId],
    queryFn: () => getMonthlyTrends(accountId),
    placeholderData: keepPreviousData,
  });

  const categoryBreakDownQuery = useQuery({
    queryKey: ["category-breakdown", profileType, accountId],
    queryFn: () => getCategoryBreakDown(accountId),
    placeholderData: keepPreviousData,
  });

  const getRecentTransactionsQuery = useQuery({
    queryKey: ["recent-transactions", profileType, accountId],
    queryFn: () => getRecentTransactions(accountId),
    placeholderData: keepPreviousData,
  });

  const isPending =
    (!summaryQuery.data && summaryQuery.isPending) ||
    (!trendsQuery.data && trendsQuery.isPending);
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
