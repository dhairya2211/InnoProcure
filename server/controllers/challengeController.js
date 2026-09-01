const mongoose = require("mongoose");
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

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

exports.getChallengeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid challenge ID"
            });
        }

        const challenge = await Challenge.findById(id);

        if (!challenge) {
            return res.status(404).json({
                message: "Challenge not found"
            });
        }

        return res.status(200).json(challenge);
    } catch (error) {
        console.error("Get challenge by id error:", error);
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

const UPDATABLE_FIELDS = [
    "title",
    "department",
    "category",
    "problemStatement",
    "desiredOutcome",
    "measurableOutcomeTarget",
    "budget",
    "timelineDays",
    "applicationDeadline",
    "dataSensitivity",
    "requiredCapabilities",
    "status",
    "createdBy",
    "evaluatorId",
    "shortlistedStartupId"
];

const OBJECT_ID_FIELDS = ["createdBy", "evaluatorId", "shortlistedStartupId"];

exports.updateChallenge = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid challenge ID"
            });
        }

        const challenge = await Challenge.findById(id);

        if (!challenge) {
            return res.status(404).json({
                message: "Challenge not found"
            });
        }

        const body = req.body || {};
        const updates = {};

        for (const field of UPDATABLE_FIELDS) {
            if (Object.prototype.hasOwnProperty.call(body, field)) {
                updates[field] = body[field];
            }
        }

        if (Object.prototype.hasOwnProperty.call(updates, "budget")) {
            if (typeof updates.budget !== "number" || Number.isNaN(updates.budget)) {
                return res.status(400).json({
                    message: "Invalid or missing request data",
                    details: "budget must be a number"
                });
            }
        }

        if (Object.prototype.hasOwnProperty.call(updates, "timelineDays")) {
            if (typeof updates.timelineDays !== "number" || Number.isNaN(updates.timelineDays)) {
                return res.status(400).json({
                    message: "Invalid or missing request data",
                    details: "timelineDays must be a number"
                });
            }
        }

        if (
            Object.prototype.hasOwnProperty.call(updates, "requiredCapabilities") &&
            !Array.isArray(updates.requiredCapabilities)
        ) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "requiredCapabilities must be an array"
            });
        }

        for (const field of OBJECT_ID_FIELDS) {
            if (!Object.prototype.hasOwnProperty.call(updates, field)) {
                continue;
            }

            const value = updates[field];

            if (value === null) {
                continue;
            }

            if (!isValidObjectId(value)) {
                return res.status(400).json({
                    message: "Invalid or missing request data",
                    details: `${field} must be a valid MongoDB ObjectId`
                });
            }
        }

        Object.assign(challenge, updates);
        const updatedChallenge = await challenge.save();

        return res.status(200).json(updatedChallenge);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Update challenge error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
