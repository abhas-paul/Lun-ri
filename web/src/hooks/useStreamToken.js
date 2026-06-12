import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axiosInstance } from "../lib/axios";
import { useAuthUser } from "./useAuthUser";

export function useStreamToken() {
  const { data: authUser } = useAuthUser();

  return useQuery({
    queryKey: ["streamToken"],

    enabled: !!authUser,

    queryFn: async () => {
      const { data } = await axiosInstance.get("/chat/token");
      return data;
    },

    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1,

    onError: (error) => {
      console.error("Stream Token Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get stream token.";

      toast.error(message);
    },
  });
}