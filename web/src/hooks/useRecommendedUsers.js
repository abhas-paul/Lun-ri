import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export function useRecommendedUsers() {
    return useQuery({
        queryKey: ["recommendedUsers"],

        queryFn: async () => {
            const { data } = await axiosInstance.get(
                "/users"
            );

            return {
                success: data?.success ?? false,
                recommendedUsers: Array.isArray(
                    data?.recommendedUsers
                )
                    ? data.recommendedUsers
                    : [],
            };
        },

        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}