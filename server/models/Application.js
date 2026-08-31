const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
        required: true
    },

    startupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Startup",
        required: true
    },

    proposedSolution: {
        type: String,
        required: true
    },

    implementationApproach: {
        type: String,
        required: true
    },

    expectedOutcome: String,

    timelineDays: Number,

    requestedBudget: Number,

    relevantExperience: String,

    status: {
        type: String,
        enum: [
            "SUBMITTED",
            "UNDER_EVALUATION",
            "SHORTLISTED",
            "REJECTED",
            "PILOT",
            "COMPLETED"
        ],
        default: "SUBMITTED"
    },

    score: {
        type: Number,
        min: 0,
        max: 100,
        default: null
    },

    rubricBreakdown: {
        problemUnderstanding: Number,
        techFeasibility: Number,
        expectedImpact: Number,
        capability: Number,
        valueForMoney: Number
    },

    evaluationComments: String,

    scoredDate: Date,

    scoredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);