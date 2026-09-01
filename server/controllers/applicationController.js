const mongoose = require("mongoose");
const Application = require("../models/Application");
const Challenge = require("../models/Challenge");
const Startup = require("../models/Startup");

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

const REQUIRED_FIELDS = [
    "startupId",
    "proposedSolution",
    "implementationApproach",
    "expectedOutcome",
    "timelineDays",
    "requestedBudget",
    "relevantExperience"
];

exports.createApplication = async (req, res) => {
    try {
        const challengeId = req.params.id;

        if (!isValidObjectId(challengeId)) {
            return res.status(400).json({
                message: "Invalid challenge ID"
            });
        }

        const challenge = await Challenge.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({
                message: "Challenge not found"
            });
        }

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

        if (!isValidObjectId(body.startupId)) {
            return res.status(400).json({
                message: "Invalid startup ID"
            });
        }

        const startup = await Startup.findById(body.startupId);

        if (!startup) {
            return res.status(400).json({
                message: "Invalid startup ID"
            });
        }

        if (typeof body.timelineDays !== "number" || Number.isNaN(body.timelineDays)) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "timelineDays must be a number"
            });
        }

        if (typeof body.requestedBudget !== "number" || Number.isNaN(body.requestedBudget)) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "requestedBudget must be a number"
            });
        }

        const application = await Application.create({
            challengeId,
            startupId: body.startupId,
            proposedSolution: body.proposedSolution,
            implementationApproach: body.implementationApproach,
            expectedOutcome: body.expectedOutcome,
            timelineDays: body.timelineDays,
            requestedBudget: body.requestedBudget,
            relevantExperience: body.relevantExperience,
            status: "SUBMITTED"
        });

        return res.status(201).json(application);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Create application error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
