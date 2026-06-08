import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    // 1. Generate Stream chat token for authenticated user
    const token = generateStreamToken(req.user._id);

    // 2. Return token
    return res.status(200).json({
      success: true,
      token,
    });

  } catch (error) {
    // Log full error for debugging
    console.error(
      "Error in getStreamToken controller:",
      error
    );

    // Generic response (do not leak internal details)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}