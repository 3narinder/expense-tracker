import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getInsights,
  generateInsight,
  getLatestInsightByType,
  getInsightEligibility,
  updateSubscriptionPlan,
} from "../../services/apiInsights";
import { useProfileType } from "../Authentication/useActiveProfile.js";

export const useInsights = () => {
  const profileType = useProfileType();
  const {
    data: insights = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["insights", profileType],
    queryFn: getInsights,
  });

  return { isPending, error, insights };
};

/**
 * useGenerateInsight
 *
 * @param {{ onLimitReached?: () => void }} options
 *   onLimitReached — called when the plan limit is hit so the caller can
 *   open the plans upgrade modal contextually.
 */
export const useGenerateInsight = ({ onLimitReached } = {}) => {
  const queryClient = useQueryClient();

  const {
    mutate: generate,
    isPending: isGenerating,
    error,
  } = useMutation({
    mutationFn: async (type) => {
      const eligibility = await getInsightEligibility();
      if (!eligibility?.canGenerate) {
        throw Object.assign(
          new Error(
            eligibility?.message ||
              "AI insight generation is currently unavailable for your account.",
          ),
          {
            reason: eligibility?.reason,
          },
        );
      }
      return generateInsight(type);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights"] });
      queryClient.invalidateQueries({ queryKey: ["insight-latest"] });
      queryClient.invalidateQueries({ queryKey: ["insight-eligibility"] });
      toast.success("Insight generated successfully!");
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to generate insight.";
      const reason = err?.response?.data?.eligibility?.reason || err?.reason;

      if (reason === "daily_limit_reached" || reason === "period_limit_reached") {
        toast(message, { icon: "🤖" });
        onLimitReached?.();
        return;
      }

      if (reason === "insufficient_data") {
        toast(message, { icon: "🤖" });
        return;
      }

      toast.error(message);
    },
  });

  return { generate, isGenerating, error };
};

export const useLatestInsightByType = (type) => {
  const profileType = useProfileType();
  const {
    data: insight = null,
    isPending,
    error,
  } = useQuery({
    queryKey: ["insight-latest", profileType, type],
    queryFn: () => getLatestInsightByType(type),
    enabled: !!type,
  });

  return { insight, isPending, error };
};

export const useInsightEligibility = () => {
  const profileType = useProfileType();
  const {
    data: eligibility,
    isPending,
    error,
  } = useQuery({
    queryKey: ["insight-eligibility", profileType],
    queryFn: getInsightEligibility,
  });

  return { eligibility, isPending, error };
};

/**
 * useUpgradePlan
 *
 * Mutation hook for changing the user's subscription plan tier.
 * Invalidates eligibility so any UI that reads it refreshes automatically.
 *
 * NOTE: In production this should only be called after payment confirmation —
 * see server/controllers/aiInsightController.js for the full TODO.
 */
export const useUpgradePlan = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: upgradePlan, isPending: isUpgrading } = useMutation({
    mutationFn: (subscriptionPlan) => updateSubscriptionPlan(subscriptionPlan),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (current) =>
        current?.user
          ? {
              ...current,
              user: {
                ...current.user,
                subscriptionPlan:
                  data?.subscriptionPlan ?? current.user.subscriptionPlan,
              },
            }
          : current,
      );
      queryClient.invalidateQueries({ queryKey: ["insight-eligibility"] });
      toast.success(`Plan updated to ${data?.subscriptionPlan ?? "new plan"}!`);
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update plan.";
      toast.error(message);
    },
  });

  return { upgradePlan, isUpgrading };
};
