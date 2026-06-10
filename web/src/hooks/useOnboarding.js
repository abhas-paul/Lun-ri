import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export function useOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post(
        "/auth/onboard",
        formData
      );

      return data;
    },

    onSuccess: async (data) => {
      toast.success(
        data?.message || "Profile completed successfully."
      );

      await queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    },
  });
}