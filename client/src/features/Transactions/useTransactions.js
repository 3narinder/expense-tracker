import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import {
  getTransactions,
  getTransactionById,
} from "../../services/apiTransaction.js";

export const useTransactions = ({
  page: pageArg,
  range,
  limit,
  search: searchArg,
  type: typeArg,
  categoryId: categoryIdArg,
  sort: sortArg, // Add sort
  startDate: startDateArg, // Add startDate
  endDate: endDateArg,
} = {}) => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const search = searchArg ?? searchParams.get("search") ?? "";
  const type = typeArg ?? searchParams.get("type") ?? "";
  const categoryId = categoryIdArg ?? searchParams.get("categoryId") ?? "";
  const page = pageArg ?? (Number(searchParams.get("page")) || 1);

  const sort = sortArg ?? searchParams.get("sort") ?? "";
  const startDate = startDateArg ?? searchParams.get("startDate") ?? "";
  const endDate = endDateArg ?? searchParams.get("endDate") ?? "";

  const filters = {
    search,
    type,
    categoryId,
    page,
    range,
    limit,
    sort,
    startDate,
    endDate,
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => getTransactions(filters),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const totalPages = data?.pagination?.totalPages || 1;

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["transactions", { ...filters, page: page + 1 }],
      queryFn: () => getTransactions({ ...filters, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["transactions", { ...filters, page: page - 1 }],
      queryFn: () => getTransactions({ ...filters, page: page - 1 }),
    });
  }

  return {
    isPending,
    error,
    transactions: data?.transactions || [],
    pagination: data?.pagination || {},
    stats: data?.stats || {},
    currentPage: page,
    totalPages,
  };
};
export const useTransaction = (id) => {
  const {
    data: transaction,
    isPending,
    error,
  } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  });

  return { isPending, error, transaction };
};
