import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { register as userRegisterApi } from "../../services/apiAuth.js";

export const useRegister = () => {
  const { mutate: register, isLoading } = useMutation({
    mutationFn: userRegisterApi,

    onSuccess: () => {
      toast.success("Profile created successfully");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  return { register, isLoading };
};
