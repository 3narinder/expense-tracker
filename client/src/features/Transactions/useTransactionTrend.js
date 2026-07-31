import { useQuery } from "@tanstack/react-query";
import { getTransactionTrend } from "../../services/apiTransaction.js";

export const useTransactionTrend = ({
  range,
  search,
  type,
  categoryId,
  sort,
  startDate,
  endDate,
  recurring,
}) => {
  const filters = { range, search, type, categoryId, sort, startDate, endDate, recurring };

  const { data, isPending } = useQuery({
    queryKey: ["transactionTrend", filters],
    queryFn: () => getTransactionTrend(filters),
    staleTime: 5000,
  });

  return { trend: data?.trend || [], isPending };
};
