import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getInsights,
  generateInsight,
  getLatestInsightByType,
  getInsightEligibility,
} from "../../services/apiInsights";

export const useInsights = () => {
  const {
    data: insights = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["insights"],
    queryFn: getInsights,
  });

  return { isPending, error, insights };
};

export const useGenerateInsight = () => {
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

      if (reason === "daily_limit_reached" || reason === "insufficient_data") {
        toast(message, { icon: "🤖" });
        return;
      }

      toast.error(message);
    },
  });

  return { generate, isGenerating, error };
};

export const useLatestInsightByType = (type) => {
  const {
    data: insight = null,
    isPending,
    error,
  } = useQuery({
    queryKey: ["insight-latest", type],
    queryFn: () => getLatestInsightByType(type),
    enabled: !!type,
  });

  return { insight, isPending, error };
};

export const useInsightEligibility = () => {
  const {
    data: eligibility,
    isPending,
    error,
  } = useQuery({
    queryKey: ["insight-eligibility"],
    queryFn: getInsightEligibility,
  });

  return { eligibility, isPending, error };
};
