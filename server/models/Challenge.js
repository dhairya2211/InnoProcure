const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    problemStatement: {
        type: String,
        required: true
    },

    desiredOutcome: {
        type: String,
        required: true
    },

    measurableOutcomeTarget: {
        type: String,
        required: true
    },

    budget: {
        type: Number,
        required: true
    },

    timelineDays: {
        type: Number,
        required: true
    },

    applicationDeadline: Date,

    dataSensitivity: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "LOW"
    },

    requiredCapabilities: [String],

    status: {
        type: String,
        enum: [
            "DRAFT",
            "OPEN",
            "CLOSED",
            "IN_EVALUATION",
            "PILOT_IN_PROGRESS",
            "COMPLETED",
            "SCALED",
            "REJECTED"
        ],
        default: "DRAFT"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    evaluatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    shortlistedStartupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Startup",
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model("Challenge", challengeSchema);