import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register as userRegisterApi } from "../../services/apiAuth.js";
import { setAuthToken } from "../../utils/authToken";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isPending } = useMutation({
    mutationFn: userRegisterApi,

    onSuccess: (data) => {
      toast.success("Profile created successfully!");
      setAuthToken(data?.token);
      queryClient.setQueryData(["user"], data);
      navigate("/", { replace: true });
    },

    onError: (err) => {
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    },
  });

  return { register, isLoading: isPending };
};
