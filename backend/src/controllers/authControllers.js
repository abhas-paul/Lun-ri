import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
    const { email, password, name, profilePic } = req.body;

    try {
        // 1. Basic validation
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // 2. Password validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long.",
            });
        }

        // 3. Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        // 4. Normalize email before storing
        const normalizedEmail = email.trim().toLowerCase();

        // 5. Check if user already exists
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists.",
            });
        }

        // 6. Create user
        // Password hashing is handled inside the model middleware
        const newUser = await User.create({
            email: normalizedEmail,
            name: name.trim(),
            password,
            profilePic: profilePic,
        });

        // 7. Add user to Stream as well
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.name,
                image: newUser.profilePic,
            });
        } catch (error) {
            console.error(
                `Failed to create Stream user for ${newUser._id}:`,
                error
            );

            // Rollback MongoDB user
            await User.findByIdAndDelete(newUser._id);

            return res.status(500).json({
                success: false,
                message: "Failed to create chat profile. Please try again.",
            });
        }


        // 8. Check JWT secret
        if (!process.env.JWT_SEC_KEY) {
            throw new Error("JWT_SEC_KEY is missing from environment variables.");
        }

        // 9. Generate auth token
        const token = jwt.sign(
            {
                userId: newUser._id,
            },
            process.env.JWT_SEC_KEY,
            {
                expiresIn: "7d",
            }
        );

        // 10. Store token in secure cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // 11. Send safe user object
        return res.status(201).json({
            success: true,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
                createdAt: newUser.createdAt,
            },
        });

    } catch (error) {
        console.error("Signup Error:", error);

        // 12. Handle duplicate email race condition
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // 2. Find user with password
        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // 3. Verify password
        const isPassCorrect = await user.comparePassword(password);

        if (!isPassCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // 4. Check JWT secret
        if (!process.env.JWT_SEC_KEY) {
            throw new Error("JWT_SEC_KEY is missing from environment variables.");
        }

        // 5. Generate token
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SEC_KEY,
            {
                expiresIn: "7d",
            }
        );

        // 6. Store token in cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // 7. Return safe user object
        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                bio: user.bio,
                nativeLanguage: user.nativeLanguage,
                location: user.location,
                isOnboarded: user.isOnboarded,
                friends: user.friends,
                createdAt: user.createdAt,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export function logout(req, res) {
    try {
        // 1. Remove auth cookie
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        // 2. Return success response
        return res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        });

    } catch (error) {
        console.error("Logout Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}