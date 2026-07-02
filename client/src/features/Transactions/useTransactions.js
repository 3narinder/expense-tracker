import { useQuery } from "@tanstack/react-query";
import {
  getTransactions,
  getTransactionById,
} from "../../services/apiTransactions.js";

export const useTransactions = (filters = {}) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => getTransactions(filters),
  });

  return {
    isPending,
    error,
    transactions: data?.transactions || [],
    pagination: data?.pagination || {},
    insights: data?.insights || {},
  };
};

export const useTransaction = (id) => {
  const {
    data: transaction,
    isPending,
    error,
  } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  });

  return { isPending, error, transaction };
};
