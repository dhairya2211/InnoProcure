const mongoose = require("mongoose");

const pilotSchema = new mongoose.Schema({

    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
        required: true
    },

    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true
    },

    startupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Startup",
        required: true
    },

    totalBudget: Number,

    status: {
        type: String,
        enum: [
            "IN_PROGRESS",
            "AWAITING_FINAL_DECISION",
            "SCALED",
            "REJECTED"
        ],
        default: "IN_PROGRESS"
    },

    agreementSigned: {
        type: Boolean,
        default: false
    },

    agreementDate: Date,

    finalDecision: {
        decision: {
            type: String,
            enum: ["SCALED", "REJECTED"]
        },
        date: Date,
        officerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comments: String,
        scaledDepartments: [String]
    }

}, { timestamps: true });

module.exports = mongoose.model("Pilot", pilotSchema);