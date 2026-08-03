import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { setAuthToken } from "../../utils/authToken";
import { setActiveProfileType } from "../../utils/profileScope.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      setAuthToken(data?.token);
      setActiveProfileType(data?.user?.activeProfileType || "personal");
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
