const mongoose = require("mongoose");
const Pilot = require("../models/Pilot");

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

exports.getPilotById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid pilot ID"
            });
        }

        const pilot = await Pilot.findById(id);

        if (!pilot) {
            return res.status(404).json({
                message: "Pilot not found"
            });
        }

        return res.status(200).json(pilot);
    } catch (error) {
        console.error("Get pilot by id error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
