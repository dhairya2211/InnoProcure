const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({

    pilotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pilot",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: String,

    dueDate: Date,

    amount: Number,

    status: {
        type: String,
        enum: [
            "PENDING",
            "SUBMITTED",
            "UNDER_VERIFICATION",
            "VERIFIED",
            "INCOMPLETE"
        ],
        default: "PENDING"
    },

    paymentStatus: {
        type: String,
        enum: ["PENDING", "RELEASED"],
        default: "PENDING"
    },

    evidenceUrl: String,

    evidenceNotes: String,

    submittedDate: Date,

    verifiedDate: Date,

    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    verificationComments: String

}, { timestamps: true });

module.exports = mongoose.model("Milestone", milestoneSchema);