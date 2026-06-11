import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

export function useSendFriendRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (recipientId) => {
            const { data } = await axiosInstance.post(
                `/users/friend-request/${recipientId}`
            );

            return data;
        },

        onSuccess: async () => {
            toast.success(
                "Friend request sent successfully."
            );

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["recommendedUsers"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["outgoingFriendRequests"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["friendRequests"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["friends"],
                }),
            ]);
        },

        onError: (error) => {
            console.error(
                "Send Friend Request Error:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to send friend request.";

            toast.error(message);
        },
    });
}