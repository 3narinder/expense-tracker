import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createCategory as createApi,
  updateCategory as updateApi,
  deleteCategory as deleteApi,
} from "../../services/apiCategories";

export const useCategoryActions = () => {
  const queryClient = useQueryClient();

  //*Create category
  const { mutate: addCategory, isPending: isCreating } = useMutation({
    mutationFn: createApi,
    onSuccess: () => {
      toast.success("Category added!");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => toast.error(err.message),
  });

  //*update category
  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: updateApi,
    onSuccess: () => {
      toast.success("Category updated!");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => toast.error(err.message),
  });

  //*Delete Category
  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteApi,
    onSuccess: () => {
      toast.success("Category deleted!");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    addCategory,
    updateCategory,
    deleteCategory,
    isCreating,
    isUpdating,
    isDeleting,
  };
};
