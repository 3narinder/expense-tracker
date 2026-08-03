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
import { useProfileType } from "../Authentication/useActiveProfile.js";

export const useTransactions = ({
  page: pageArg,
  range,
  limit,
  search: searchArg,
  type: typeArg,
  categoryId: categoryIdArg,
  sort: sortArg,
  startDate: startDateArg,
  endDate: endDateArg,
  recurring: recurringArg,
} = {}) => {
  const profileType = useProfileType();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const search = searchArg ?? searchParams.get("search") ?? "";
  const type = typeArg ?? searchParams.get("type") ?? "";
  const categoryId = categoryIdArg ?? searchParams.get("categoryId") ?? "";
  const page = pageArg ?? (Number(searchParams.get("page")) || 1);

  const sort = sortArg ?? searchParams.get("sort") ?? "";
  const startDate = startDateArg ?? searchParams.get("startDate") ?? "";
  const endDate = endDateArg ?? searchParams.get("endDate") ?? "";
  const recurring = recurringArg ?? searchParams.get("recurring") ?? "";

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
    recurring,
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["transactions", profileType, filters],
    queryFn: () => getTransactions(filters),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const totalPages = data?.pagination?.totalPages || 1;

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["transactions", profileType, { ...filters, page: page + 1 }],
      queryFn: () => getTransactions({ ...filters, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["transactions", profileType, { ...filters, page: page - 1 }],
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
  const profileType = useProfileType();
  const {
    data: transaction,
    isPending,
    error,
  } = useQuery({
    queryKey: ["transaction", profileType, id],
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  });

  return { isPending, error, transaction };
};
