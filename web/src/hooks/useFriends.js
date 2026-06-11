import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export function useFriends() {
    return useQuery({
        queryKey: ["friends"],

        queryFn: async () => {
            const { data } = await axiosInstance.get(
                "/users/friends"
            );

            return {
                success: data?.success ?? false,
                friends: Array.isArray(data?.friends)
                    ? data.friends
                    : [],
            };
        },

        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}