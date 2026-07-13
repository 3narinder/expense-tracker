import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInsights, generateInsight } from "../../services/apiInsights";

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
    mutationFn: (type) => generateInsight(type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights"] });
    },
  });

  return { generate, isGenerating, error };
};
