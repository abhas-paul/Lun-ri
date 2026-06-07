import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        bio: {
            type: String,
            default: "Hey there! I am using Lun-ri.",
            trim: true,
        },

        profilePic: {
            type: String,
            default: "",
        },

        nativeLanguage: {
            type: String,
            default: "English",
        },

        location: {
            type: String,
            default: "Unknown",
        },

        isOnboarded: {
            type: Boolean,
            default: false,
        },

        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

// pre-hook
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
})

export default User;