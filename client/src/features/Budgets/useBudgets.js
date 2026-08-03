import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "../../services/apiBudget.js";
import { useProfileType } from "../Authentication/useActiveProfile.js";

export const useBudgets = () => {
  const profileType = useProfileType();
  const {
    data: budgets,
    isPending,
    error,
  } = useQuery({
    queryKey: ["budget", profileType],
    queryFn: getBudgets,
  });

  return { isPending, error, budgets };
};
