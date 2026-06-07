import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

// 1. Verify environment variables on startup
if (!apiKey || !apiSecret) {
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing.");
}

const streamClient = StreamChat.getInstance(
    apiKey,
    apiSecret
);

// 2. Create or update Stream user
export const upsertStreamUser = async (userData) => {
    try {
        // 3. Validate required Stream fields
        if (!userData?.id) {
            throw new Error("Stream user id is required.");
        }

        await streamClient.upsertUsers([userData]);

        return userData;

    } catch (error) {
        console.error("Stream User Upsert Error:", error);

        throw new Error("Failed to create/update Stream user.");
    }
};

// 4. Generate Stream token
export const generateStreamToken = (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required.");
        }

        return streamClient.createToken(userId.toString());

    } catch (error) {
        console.error("Stream Token Generation Error:", error);

        throw new Error("Failed to generate Stream token.");
    }
};

export default streamClient;