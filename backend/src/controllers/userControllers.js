import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js"

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, // Exclude current user
                { _id: { $nin: currentUser.friends } }, // Exclude existing friends
                { isOnboarded: true }, // Only onboarded users
            ],
        })
            .select("name profilePic bio nativeLanguage location")
            .limit(20);

        return res.status(200).json({
            success: true,
            recommendedUsers,
        });

    } catch (error) {
        console.error(
            "Get Recommended Users Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user._id)
            .select("friends")
            .populate(
                "friends",
                "name profilePic bio nativeLanguage location"
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            friends: user.friends,
        });

    } catch (error) {
        console.error(
            "Get My Friends Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user._id;
        const { id: recipientId } = req.params;

        // 1. Prevent sending request to yourself
        if (myId.toString() === recipientId) {
            return res.status(400).json({
                success: false,
                message: "You cannot send a friend request to yourself.",
            });
        }

        // 2. Check recipient exists
        const recipient = await User.findById(recipientId);

        if (!recipient) {
            return res.status(404).json({
                success: false,
                message: "Recipient not found.",
            });
        }

        // 3. Check if already friends
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({
                success: false,
                message: "You are already friends with this user.",
            });
        }

        // 4. Check if request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId },
            ],
        });

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "A friend request already exists between you and this user.",
            });
        }

        // 5. Create friend request
        const friendReq = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        // 6. Response
        return res.status(201).json({
            success: true,
            friendRequest: friendReq,
        });

    } catch (error) {
        console.error("Send Friend Request Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;

        // 1. Find friend request
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({
                success: false,
                message: "Friend request not found.",
            });
        }

        // 2. Prevent re-accepting same request
        if (friendRequest.status === "accepted") {
            return res.status(400).json({
                success: false,
                message: "Friend request already accepted.",
            });
        }

        // 3. Verify recipient is the logged-in user
        if (
            friendRequest.recipient.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to accept this request.",
            });
        }

        // 4. Mark request as accepted
        friendRequest.status = "accepted";
        await friendRequest.save();

        // 5. Add each user to the other's friend list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {
                friends: friendRequest.recipient,
            },
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {
                friends: friendRequest.sender,
            },
        });

        // 6. Success response
        return res.status(200).json({
            success: true,
            message: "Friend request accepted.",
        });

    } catch (error) {
        console.error(
            "Accept Friend Request Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function getFriendRequests(req, res) {
    try {
        const userId = req.user._id;

        // 1. Incoming friend requests (pending)
        const incomingReqs = await FriendRequest.find({
            recipient: userId,
            status: "pending",
        }).populate(
            "sender",
            "name profilePic nativeLanguage location bio"
        );

        // 2. Outgoing accepted requests
        const acceptedReqs = await FriendRequest.find({
            sender: userId,
            status: "accepted",
        }).populate(
            "recipient",
            "name profilePic nativeLanguage location bio"
        );

        // 3. Response
        return res.status(200).json({
            success: true,
            incomingReqs,
            acceptedReqs,
        });

    } catch (error) {
        console.error(
            "Error in getFriendRequests controller:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const userId = req.user._id;

    // 1. Fetch all pending friend requests sent by current user
    const outgoingRequests = await FriendRequest.find({
      sender: userId,
      status: "pending",
    }).populate(
      "recipient",
      "name profilePic nativeLanguage location bio"
    );

    // 2. Return outgoing requests
    return res.status(200).json({
      success: true,
      outgoingRequests,
    });

  } catch (error) {
    // Log error for debugging (do not expose internal details to client)
    console.error(
      "Error in getOutgoingFriendReqs controller:",
      error
    );

    // Generic server error response
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}