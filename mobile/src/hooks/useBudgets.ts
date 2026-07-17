import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "../services/apiBudget";

export const useBudgets = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });
};
