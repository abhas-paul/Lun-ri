import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`MongoDB Connected Successfully, ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1); // 1 => fail
    }
}