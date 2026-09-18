const mongoose = require("mongoose");
const Startup = require("../models/Startup");
const User = require("../models/User");

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

exports.getStartups = async (req, res) => {
    try {
        const startups = await Startup.find().populate("userId", "name email role");
        return res.status(200).json(startups);
    } catch (error) {
        console.error("Get startups error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

const CREATE_REQUIRED_FIELDS = ["userId", "companyName"];

exports.createStartup = async (req, res) => {
    try {
        const body = req.body || {};
        const missingFields = CREATE_REQUIRED_FIELDS.filter((field) => {
            const value = body[field];
            return value === undefined || value === null || value === "";
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                missingFields
            });
        }

        if (!isValidObjectId(body.userId)) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "userId must be a valid MongoDB ObjectId"
            });
        }

        const owner = await User.findById(body.userId);

        if (!owner) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "userId does not match an existing user"
            });
        }

        const existingStartup = await Startup.findOne({ userId: body.userId });

        if (existingStartup) {
            return res.status(409).json({
                message: "Startup already exists for this user"
            });
        }

        if (body.teamSize !== undefined && (typeof body.teamSize !== "number" || Number.isNaN(body.teamSize))) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "teamSize must be a number"
            });
        }

        for (const field of ["capabilities", "technologyAreas"]) {
            if (body[field] !== undefined && !Array.isArray(body[field])) {
                return res.status(400).json({
                    message: "Invalid or missing request data",
                    details: `${field} must be an array`
                });
            }
        }

        const startup = await Startup.create({
            userId: body.userId,
            companyName: body.companyName,
            dpiitNumber: body.dpiitNumber,
            foundingYear: body.foundingYear,
            headquarters: body.headquarters,
            shortDescription: body.shortDescription,
            capabilities: body.capabilities,
            technologyAreas: body.technologyAreas,
            pastExperience: body.pastExperience,
            teamSize: body.teamSize,
            website: body.website,
            contactEmail: body.contactEmail,
            contactPhone: body.contactPhone
        });

        return res.status(201).json(startup);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Create startup error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

exports.getStartupProfile = async (req, res) => {
    try {
        const startupId = req.query.startupId;

        if (!startupId || !isValidObjectId(startupId)) {
            return res.status(400).json({
                message: "Invalid startup ID"
            });
        }

        const startup = await Startup.findById(startupId);

        if (!startup) {
            return res.status(404).json({
                message: "Startup not found"
            });
        }

        return res.status(200).json(startup);
    } catch (error) {
        console.error("Get startup profile error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

const UPDATABLE_FIELDS = [
    "companyName",
    "dpiitNumber",
    "foundingYear",
    "headquarters",
    "shortDescription",
    "capabilities",
    "technologyAreas",
    "pastExperience",
    "teamSize",
    "website",
    "contactEmail",
    "contactPhone"
];

const ARRAY_FIELDS = ["capabilities", "technologyAreas"];

exports.updateStartupProfile = async (req, res) => {
    try {
        const startupId = req.query.startupId;

        if (!startupId || !isValidObjectId(startupId)) {
            return res.status(400).json({
                message: "Invalid startup ID"
            });
        }

        const startup = await Startup.findById(startupId);

        if (!startup) {
            return res.status(404).json({
                message: "Startup not found"
            });
        }

        const body = req.body || {};
        const updates = {};

        for (const field of UPDATABLE_FIELDS) {
            if (Object.prototype.hasOwnProperty.call(body, field)) {
                updates[field] = body[field];
            }
        }

        if (Object.prototype.hasOwnProperty.call(updates, "teamSize")) {
            if (typeof updates.teamSize !== "number" || Number.isNaN(updates.teamSize)) {
                return res.status(400).json({
                    message: "Invalid or missing request data",
                    details: "teamSize must be a number"
                });
            }
        }

        for (const field of ARRAY_FIELDS) {
            if (
                Object.prototype.hasOwnProperty.call(updates, field) &&
                !Array.isArray(updates[field])
            ) {
                return res.status(400).json({
                    message: "Invalid or missing request data",
                    details: `${field} must be an array`
                });
            }
        }

        Object.assign(startup, updates);
        const updatedStartup = await startup.save();

        return res.status(200).json(updatedStartup);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Update startup profile error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
