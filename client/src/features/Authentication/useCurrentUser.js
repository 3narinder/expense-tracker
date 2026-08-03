import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe as getMeApi } from "../../services/apiAuth";
import { getAuthToken } from "../../utils/authToken.js";
import { setActiveProfileType } from "../../utils/profileScope.js";

export const useCurrentUser = () => {
  const hasSessionToken = Boolean(getAuthToken());
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getMeApi,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: hasSessionToken,
  });

  useEffect(() => {
    if (data?.user?.activeProfileType) {
      setActiveProfileType(data.user.activeProfileType);
    }
  }, [data?.user?.activeProfileType]);

  return {
    user: data?.user,
    isLoading: hasSessionToken ? isLoading : false,
    isAuthenticated: !!data?.user,
    hasSessionToken,
    error,
  };
};
