import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export function useOutgoingFriendRequests() {
    return useQuery({
        queryKey: ["outgoingFriendRequests"],

        queryFn: async () => {
            const { data } = await axiosInstance.get(
                "/users/outgoing-friend-requests"
            );

            return {
                success: data?.success ?? false,

                outgoingRequests: Array.isArray(
                    data?.outgoingRequests
                )
                    ? data.outgoingRequests
                    : [],
            };
        },

        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}