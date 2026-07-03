import { useQuery } from "@tanstack/react-query";
import { getTransactionTrend } from "../../services/apiTransaction.js";

export const useTransactionTrend = ({ range, search, type, categoryId }) => {
  const filters = { range, search, type, categoryId };

  const { data, isPending } = useQuery({
    queryKey: ["transactionTrend", filters],
    queryFn: () => getTransactionTrend(filters),
    staleTime: 5000,
  });

  return { trend: data?.trend || [], isPending };
};
