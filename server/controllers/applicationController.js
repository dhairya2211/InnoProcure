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

exports.getApplications = async (req, res) => {
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

        const applications = await Application.find({ challengeId }).populate({
            path: "startupId",
            select: "-userId"
        });

        return res.status(200).json(applications);
    } catch (error) {
        console.error("Get applications error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

const RUBRIC_CRITERIA = [
    "problemUnderstanding",
    "techFeasibility",
    "expectedImpact",
    "capability",
    "valueForMoney"
];

function isNumber(value) {
    return typeof value === "number" && !Number.isNaN(value);
}

exports.scoreApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;

        if (!isValidObjectId(applicationId)) {
            return res.status(400).json({
                message: "Invalid application ID"
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const body = req.body || {};

        if (!isNumber(body.score)) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "score must be a number"
            });
        }

        if (body.score < 0 || body.score > 100) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "score must be between 0 and 100"
            });
        }

        if (!body.rubricBreakdown || typeof body.rubricBreakdown !== "object" || Array.isArray(body.rubricBreakdown)) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "rubricBreakdown is required"
            });
        }

        for (const criterion of RUBRIC_CRITERIA) {
            if (!isNumber(body.rubricBreakdown[criterion])) {
                return res.status(400).json({
                    message: "Invalid or missing request data",
                    details: `rubricBreakdown.${criterion} must be a number`
                });
            }
        }

        application.score = body.score;
        application.rubricBreakdown = {
            problemUnderstanding: body.rubricBreakdown.problemUnderstanding,
            techFeasibility: body.rubricBreakdown.techFeasibility,
            expectedImpact: body.rubricBreakdown.expectedImpact,
            capability: body.rubricBreakdown.capability,
            valueForMoney: body.rubricBreakdown.valueForMoney
        };

        if (body.evaluationComments !== undefined) {
            application.evaluationComments = body.evaluationComments;
        }

        application.scoredDate = new Date();

        if (body.scoredBy !== undefined && body.scoredBy !== null && body.scoredBy !== "") {
            if (!isValidObjectId(body.scoredBy)) {
                return res.status(400).json({
                    message: "Invalid or missing request data",
                    details: "scoredBy must be a valid MongoDB ObjectId"
                });
            }
            application.scoredBy = body.scoredBy;
        }

        const updatedApplication = await application.save();

        return res.status(200).json(updatedApplication);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Score application error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
