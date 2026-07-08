import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createBudget as createApi,
  updateBudget as updateApi,
  deleteBudget as deleteApi,
} from "../../services/apiBudget.js";

export const useBudgetActions = () => {
  const queryClient = useQueryClient();

  const { mutate: addBudget, isPending: isCreating } = useMutation({
    mutationFn: createApi,
    onSuccess: () => {
      toast.success("Budget created successfully");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
    onError: (error) => toast.error(error.message || "Failed to create budget"),
  });

  const { mutate: editBudget, isPending: isUpdating } = useMutation({
    mutationFn: updateApi,
    onSuccess: () => {
      toast.success("Budget updated successfully");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
    onError: (error) => toast.error(error.message || "Failed to update budget"),
  });

  const { mutate: removeBudget, isPending: isDeleting } = useMutation({
    mutationFn: deleteApi,
    onSuccess: () => {
      toast.success("Budget removed");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
    onError: (error) => toast.error(error.message || "Failed to delete budget"),
  });

  return {
    addBudget,
    isCreating,
    editBudget,
    isUpdating,
    removeBudget,
    isDeleting,
  };
};
