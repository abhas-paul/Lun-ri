import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { getMyFriends, getRecommendedUsers, sendFriendRequest } from "../controllers/userControllers.js";

const router = express.Router();

// middleware to all routes.
router.use(protectedRoute)

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.post("/friend-request/:id/accept", acceptFriendRequest);


export default router;