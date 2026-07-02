import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories.js";

export const useCategories = () => {
  const {
    data: categories,
    isPending,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  return { isPending, error, categories };
};
