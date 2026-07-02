import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register as userRegisterApi } from "../../services/apiAuth.js";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: userRegisterApi,

    onSuccess: (data) => {
      toast.success("Profile created successfully!");
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  return { register, isLoading };
};
