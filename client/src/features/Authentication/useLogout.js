import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";
import { clearAuthToken } from "../../utils/authToken";

export const useLogout = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      clearAuthToken();
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading: isPending };
};
