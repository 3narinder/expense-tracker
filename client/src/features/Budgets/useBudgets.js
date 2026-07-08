import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "../../services/apiBudget.js";

export const useBudgets = () => {
  const {
    data: budgets,
    isPending,
    error,
  } = useQuery({
    queryKey: ["budget"],
    queryFn: getBudgets,
  });

  return { isPending, error, budgets };
};
