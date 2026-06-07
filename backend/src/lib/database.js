import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // 1. Verify environment variable
        if (!process.env.MONGO_DB_URI) {
            throw new Error("MONGO_DB_URI is missing.");
        }

        const connection = await mongoose.connect(
            process.env.MONGO_DB_URI
        );

        console.log(
            `MongoDB Connected Successfully: ${connection.connection.host}`
        );

    } catch (error) {
        console.error(
            "MongoDB Connection Error:",
            error.message
        );

        process.exit(1); // Exit application on DB failure
    }
};