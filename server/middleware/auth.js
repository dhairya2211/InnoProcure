const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-passwordHash");

        if (!user) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        console.error("Auth error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

exports.requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        next();
    };
};
