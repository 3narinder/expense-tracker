import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories.js";
import { useProfileType } from "../Authentication/useActiveProfile.js";

export const useCategories = () => {
  const profileType = useProfileType();
  const {
    data: categories,
    isPending,
    error,
  } = useQuery({
    queryKey: ["category", profileType],
    queryFn: getCategories,
  });

  return { isPending, error, categories };
};
