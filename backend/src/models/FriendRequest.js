import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

// 1. Prevent duplicate requests between same users
friendRequestSchema.index(
    { sender: 1, recipient: 1 },
    { unique: true }
);

// 2. Model
const FriendRequest = mongoose.model(
    "FriendRequest",
    friendRequestSchema
);

export default FriendRequest;