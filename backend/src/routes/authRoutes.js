import express, { Router } from "express";
import { login, logout, onboard, signup } from "../controllers/authControllers.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboard", protectedRoute, onboard)

export default router