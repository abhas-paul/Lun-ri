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