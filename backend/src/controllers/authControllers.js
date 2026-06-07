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

        // TODO: Add user to stream as well.

        // Check JWT secret
        if (!process.env.JWT_SEC_KEY) {
            throw new Error("JWT_SEC_KEY is missing from environment variables.");
        }

        // 7. Generate auth token
        const token = jwt.sign(
            {
                userId: newUser._id,
            },
            process.env.JWT_SEC_KEY,
            {
                expiresIn: "7d",
            }
        );

        // 8. Store token in secure cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // 9. Send safe user object
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

        // 10. Handle duplicate email race condition
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
    res.send("login")
}

export function logout(req, res) {
    res.send("logout")
}