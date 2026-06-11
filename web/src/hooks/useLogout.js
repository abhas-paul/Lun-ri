import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data } = await axiosInstance.post("/auth/logout");
            return data;
        },

        onSuccess: (data) => {
            // Clear authenticated user from cache
            queryClient.setQueryData(["authUser"], null);

            // Optional: remove inactive queries from cache
            queryClient.invalidateQueries({
                queryKey: ["authUser"],
            });

            toast.success(
                data?.message || "Logged out successfully."
            );

            // Redirect to login page
            navigate("/login", {
                replace: true,
            });
        },

        onError: (error) => {
            console.error("Logout Error:", error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to logout. Please try again.";

            toast.error(message);
        },
    });
}