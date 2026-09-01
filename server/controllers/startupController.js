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
