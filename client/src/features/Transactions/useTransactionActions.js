import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  bulkDeleteTransactions,
} from "../../services/apiTransaction.js";

export const useTransactionActions = () => {
  const queryClient = useQueryClient();
  const refreshTransactionViews = () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["transaction"] });
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["trends"] });
    queryClient.invalidateQueries({ queryKey: ["category-breakdown"] });
    queryClient.invalidateQueries({ queryKey: ["budget"] });
  };

  //** 1. Create Transaction Mutation
  const { mutate: addTransaction, isPending: isCreating } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success("Transaction created successfully");
      refreshTransactionViews();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create transaction");
    },
  });

  //** 2. Update Transaction Mutation
  const { mutate: editTransaction, isPending: isUpdating } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: (data) => {
      toast.success("Transaction updated successfully");
      refreshTransactionViews();
      // Invalidate the single transaction cache line if it exists
      queryClient.invalidateQueries({
        queryKey: ["transaction", data?.id || data?._id],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update transaction");
    },
  });

  //** 3. Delete Single Transaction Mutation
  const { mutate: removeTransaction, isPending: isDeleting } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      refreshTransactionViews();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete transaction");
    },
  });

  //**  4. Bulk Delete Transactions Mutation
  const { mutate: removeMultipleTransactions, isPending: isBulkDeleting } =
    useMutation({
      mutationFn: bulkDeleteTransactions,
      onSuccess: () => {
        toast.success("Selected transactions deleted successfully");
        refreshTransactionViews();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete selected transactions");
      },
    });

  return {
    addTransaction,
    isCreating,
    editTransaction,
    isUpdating,
    removeTransaction,
    isDeleting,
    removeMultipleTransactions,
    isBulkDeleting,
  };
};
