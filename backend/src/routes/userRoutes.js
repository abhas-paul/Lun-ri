import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { getMyFriends, getRecommendedUsers } from "../controllers/userControllers.js";

const router = express.Router();

// middleware to all routes.
router.use(protectedRoute)

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);


export default router;