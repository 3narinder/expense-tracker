import { useQuery } from "@tanstack/react-query";
import { getMe as getMeApi } from "../../services/apiAuth";
import { getAuthToken } from "../../utils/authToken";

export const useCurrentUser = () => {
  const hasToken = !!getAuthToken();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getMeApi,
    enabled: hasToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    user: data?.user,
    isLoading: hasToken ? isLoading : false,
    isAuthenticated: !!data?.user,
    error,
  };
};
