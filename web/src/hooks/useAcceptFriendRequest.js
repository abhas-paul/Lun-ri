import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

export function useAcceptFriendRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (requestId) => {
            const { data } = await axiosInstance.post(
                `/users/friend-request/${requestId}/accept`
            );

            return data;
        },

        onSuccess: async (data) => {
            toast.success(
                data?.message ||
                "Friend request accepted."
            );

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["friendRequests"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["outgoingFriendRequests"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["friends"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["recommendedUsers"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["authUser"],
                }),
            ]);
        },

        onError: (error) => {
            console.error(
                "Accept Friend Request Error:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to accept friend request.";

            toast.error(message);
        },
    });
}