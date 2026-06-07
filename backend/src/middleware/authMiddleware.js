import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
    try {
        // 1. Verify JWT secret
        if (!process.env.JWT_SEC_KEY) {
            throw new Error("JWT_SEC_KEY is missing.");
        }

        // 2. Get token from cookie
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided.",
            });
        }

        // 3. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SEC_KEY
        );

        // 4. Find authenticated user
        const user = await User.findById(
            decoded.userId
        ).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - User not found.",
            });
        }

        // 5. Attach user to request
        req.user = user;

        next();

    } catch (error) {
        console.error(
            "Protected Route Error:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid or expired token.",
        });
    }
};