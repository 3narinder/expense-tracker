import { useQuery } from "@tanstack/react-query";
import { getMe as getMeApi } from "../../services/apiAuth";

export const useCurrentUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getMeApi,
    retry: false,
  });

  console.log(data);

  return {
    user: data?.user,
    isLoading,
    isAuthenticated: data?.isAuthenticated,
    error,
  };
};
