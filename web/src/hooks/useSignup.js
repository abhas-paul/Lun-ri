import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosInstance.post(
        "/auth/signup",
        userData
      );

      return data;
    },

    onSuccess: async () => {
      toast.success("Account created successfully!");

      await queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });

      navigate("/onboarding", {
        replace: true,
      });
    },

    onError: (error) => {
      console.error("Signup Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    },
  });
}