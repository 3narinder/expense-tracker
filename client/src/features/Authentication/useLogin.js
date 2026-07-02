import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: loginApi,

    onSuccess: () => {
      toast.success("Welcome back!");
      navigate("/dashboard", { replace: true });
    },

    onError: () => {
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoading: isPending };
};
