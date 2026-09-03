import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe as getMeApi } from "../../services/apiAuth";
import { setActiveProfileType } from "../../utils/profileScope.js";

export const useCurrentUser = () => {
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["user"],
    queryFn: getMeApi,
    retry: (failureCount, err) => {
      // Don't retry confirmed auth failures; retry cold-start / network timeouts.
      if (err?.response?.status === 401) return false;
      return failureCount < 3;
    },
    retryDelay: (attempt) => Math.min(1500 * 2 ** attempt, 12000),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    // Always attempt session restore — cookie may be valid even if localStorage is empty.
    enabled: true,
  });

  useEffect(() => {
    if (data?.user?.activeProfileType) {
      setActiveProfileType(data.user.activeProfileType);
    }
  }, [data?.user?.activeProfileType]);

  // Hold routing until we have a resolved session (including retries on cold start).
  const isAuthPending = data === undefined && (isPending || isFetching);

  return {
    user: data?.user ?? null,
    isAuthPending,
    isLoading: isAuthPending,
    isAuthenticated: !!data?.user,
    error,
  };
};
