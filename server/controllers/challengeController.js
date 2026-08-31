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

const REQUIRED_FIELDS = [
    "title",
    "department",
    "category",
    "problemStatement",
    "desiredOutcome",
    "measurableOutcomeTarget",
    "budget",
    "timelineDays"
];

exports.createChallenge = async (req, res) => {
    try {
        const body = req.body || {};
        const missingFields = REQUIRED_FIELDS.filter((field) => {
            const value = body[field];
            return value === undefined || value === null || value === "";
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                missingFields
            });
        }

        if (typeof body.budget !== "number" || Number.isNaN(body.budget)) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "budget must be a number"
            });
        }

        if (typeof body.timelineDays !== "number" || Number.isNaN(body.timelineDays)) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "timelineDays must be a number"
            });
        }

        if (
            body.requiredCapabilities !== undefined &&
            !Array.isArray(body.requiredCapabilities)
        ) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "requiredCapabilities must be an array"
            });
        }

        const challenge = await Challenge.create({
            title: body.title,
            department: body.department,
            category: body.category,
            problemStatement: body.problemStatement,
            desiredOutcome: body.desiredOutcome,
            measurableOutcomeTarget: body.measurableOutcomeTarget,
            budget: body.budget,
            timelineDays: body.timelineDays,
            applicationDeadline: body.applicationDeadline,
            dataSensitivity: body.dataSensitivity,
            requiredCapabilities: body.requiredCapabilities
        });

        return res.status(201).json(challenge);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Create challenge error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
