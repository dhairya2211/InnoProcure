const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const VALID_ROLES = ["government", "evaluator", "startup", "admin"];
const SIGNUP_REQUIRED_FIELDS = ["name", "email", "password", "role"];

function toUserProfile(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

function signToken(user) {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

exports.register = async (req, res) => {
    try {
        const body = req.body || {};

        const missingFields = SIGNUP_REQUIRED_FIELDS.filter((field) => {
            const value = body[field];
            return value === undefined || value === null || String(value).trim() === "";
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Missing required fields",
                missingFields
            });
        }

        const role = String(body.role).trim().toLowerCase();
        if (!VALID_ROLES.includes(role)) {
            return res.status(400).json({
                message: "Invalid role. Must be one of: government, evaluator, startup, admin"
            });
        }

        const email = String(body.email).trim().toLowerCase();
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        const password = String(body.password);
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: String(body.name).trim(),
            email,
            passwordHash,
            role,
            department: body.department ? String(body.department).trim() : undefined,
            designation: body.designation ? String(body.designation).trim() : undefined,
            avatar: body.avatar ? String(body.avatar).trim() : undefined
        });

        const createdUser = await User.findById(user._id).select("-passwordHash");
        const token = signToken(createdUser);

        return res.status(201).json({
            token,
            user: toUserProfile(createdUser)
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Register error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email: String(email).trim().toLowerCase() });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = signToken(user);

        return res.status(200).json({
            token,
            user: toUserProfile(user)
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
