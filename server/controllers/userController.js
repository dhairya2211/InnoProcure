const bcrypt = require("bcryptjs");
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

const REQUIRED_FIELDS = ["name", "email", "password", "role"];

exports.createUser = async (req, res) => {
    try {
        const body = req.body || {};

        const missingRequired = REQUIRED_FIELDS.some((field) => {
            const value = body[field];
            return value === undefined || value === null || value === "";
        });

        if (missingRequired) {
            return res.status(400).json({
                message: "Invalid or missing request data"
            });
        }

        const existingUser = await User.findOne({ email: body.email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const passwordHash = await bcrypt.hash(body.password, 10);

        const user = await User.create({
            name: body.name,
            email: body.email,
            passwordHash,
            role: body.role,
            department: body.department,
            designation: body.designation,
            avatar: body.avatar
        });

        const createdUser = await User.findById(user._id).select("-passwordHash");

        return res.status(201).json(createdUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Create user error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
