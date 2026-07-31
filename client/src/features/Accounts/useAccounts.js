import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../../services/apiAccounts";

export const useAccounts = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["account"],
    queryFn: getAccounts,
  });

  return { isPending, error, accounts: data || [] };
};

export const useAccountActions = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["account"] });

  const { mutate: addAccount, isPending: isCreating } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      toast.success("Account created.");
      invalidate();
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message || "Failed to create account.";
      toast.error(msg);
    },
  });

  const { mutate: editAccount, isPending: isUpdating } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      toast.success("Account updated.");
      invalidate();
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message || "Failed to update account.";
      toast.error(msg);
    },
  });

  const { mutate: removeAccount, isPending: isDeleting } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted.");
      invalidate();
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message || "Failed to delete account.";
      toast.error(msg);
    },
  });

  return {
    addAccount,
    isCreating,
    editAccount,
    isUpdating,
    removeAccount,
    isDeleting,
  };
};
