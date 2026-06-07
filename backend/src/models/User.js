import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        // 1. Basic user info
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
            select: false,
        },

        // 2. Profile info
        bio: {
            type: String,
            default: "Hey there! I am using Lun-ri.",
            trim: true,
        },

        profilePic: {
            type: String,
            default: function () {
                return `https://api.dicebear.com/9.x/adventurer/svg?seed=${this.email}`;
            },
        },

        nativeLanguage: {
            type: String,
            default: "English",
        },

        location: {
            type: String,
            default: "Unknown",
        },

        // 3. Onboarding status
        isOnboarded: {
            type: Boolean,
            default: false,
        },

        // 4. Friends list
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

// 5. Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// 6. Compare password helper for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;