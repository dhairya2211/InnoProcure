const Challenge = require("../models/Challenge");

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

exports.getChallenges = async (req, res) => {
    try {
        const { category, search } = req.query;
        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            const searchRegex = new RegExp(escapeRegex(search), "i");
            filter.$or = [
                { title: searchRegex },
                { problemStatement: searchRegex },
                { desiredOutcome: searchRegex },
                { measurableOutcomeTarget: searchRegex }
            ];
        }

        const challenges = await Challenge.find(filter);
        return res.status(200).json(challenges);
    } catch (error) {
        console.error("Get challenges error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
