import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Welcome back!");
      navigate("/", { replace: true });
    },

    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Provided email or password is incorrect",
      );
    },
  });

  return { login, isLoading: isPending };
};
