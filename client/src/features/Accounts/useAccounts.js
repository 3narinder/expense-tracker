import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "../../services/apiAccounts";

export const useAccounts = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["account"],
    queryFn: getAccounts,
  });

  return { isPending, error, accounts: data || [] };
};
