import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateActiveProfile } from "../../services/apiAuth.js";
import { useCurrentUser } from "./useCurrentUser.js";
import {
  getActiveProfileType,
  setActiveProfileType,
} from "../../utils/profileScope.js";

export const useActiveProfile = () => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const activeProfileType =
    user?.activeProfileType || getActiveProfileType() || "personal";

  const { mutate: switchProfile, isPending: isSwitchingProfile } = useMutation({
    mutationFn: updateActiveProfile,
    onMutate: (nextProfileType) => {
      const previousUserQuery = queryClient.getQueryData(["user"]);
      const previousStoredProfile = getActiveProfileType();
      const normalized = setActiveProfileType(nextProfileType);

      queryClient.setQueryData(["user"], (current) => {
        if (!current?.user) return current;
        return {
          ...current,
          user: {
            ...current.user,
            activeProfileType: normalized,
          },
        };
      });

      return { previousUserQuery, previousStoredProfile };
    },
    onSuccess: (data) => {
      if (data?.user?.activeProfileType) {
        setActiveProfileType(data.user.activeProfileType);
      }
      queryClient.setQueryData(["user"], data);
    },
    onError: (error, _nextProfileType, context) => {
      if (context?.previousUserQuery) {
        queryClient.setQueryData(["user"], context.previousUserQuery);
      }
      setActiveProfileType(context?.previousStoredProfile || "personal");
      toast.error(error.message || "Failed to switch profile.");
    },
  });

  return { activeProfileType, switchProfile, isSwitchingProfile };
};

export const useProfileType = () => {
  const { user } = useCurrentUser();
  return user?.activeProfileType || getActiveProfileType() || "personal";
};
