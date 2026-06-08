import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from "./lib/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: `, PORT)
    connectDB();
});