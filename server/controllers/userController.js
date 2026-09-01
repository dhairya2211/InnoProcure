const User = require("../models/User");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-passwordHash");

        return res.status(200).json(users);
    } catch (error) {
        console.error("Get users error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
