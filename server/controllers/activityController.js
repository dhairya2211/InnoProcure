const ActivityLog = require("../models/ActivityLog");

exports.getActivity = async (req, res) => {
    try {
        const activities = await ActivityLog.find().sort({ timestamp: -1 });

        return res.status(200).json(activities);
    } catch (error) {
        console.error("Get activity error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
