import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post(
        "/auth/login",
        credentials
      );

      return data;
    },

    onSuccess: async (data) => {
      toast.success(`Welcome back, ${data.user.name}!`);

      await queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });

      navigate("/", {
        replace: true,
      });
    },

    onError: (error) => {
      console.error("Login Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    },
  });
}