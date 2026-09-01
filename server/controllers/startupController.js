const mongoose = require("mongoose");
const Startup = require("../models/Startup");

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

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
