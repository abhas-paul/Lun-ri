import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export function useFriendRequests() {
    return useQuery({
        queryKey: ["friendRequests"],

        queryFn: async () => {
            const { data } = await axiosInstance.get(
                "/users/friend-requests"
            );

            return {
                success: data?.success ?? false,

                incomingReqs: Array.isArray(
                    data?.incomingReqs
                )
                    ? data.incomingReqs
                    : [],

                acceptedReqs: Array.isArray(
                    data?.acceptedReqs
                )
                    ? data.acceptedReqs
                    : [],
            };
        },

        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}