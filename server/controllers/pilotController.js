const mongoose = require("mongoose");
const Pilot = require("../models/Pilot");
const Milestone = require("../models/Milestone");
const Startup = require("../models/Startup");

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

exports.getPilotById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid pilot ID"
            });
        }

        const pilot = await Pilot.findById(id);

        if (!pilot) {
            return res.status(404).json({
                message: "Pilot not found"
            });
        }

        return res.status(200).json(pilot);
    } catch (error) {
        console.error("Get pilot by id error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

const SUBMITTABLE_STATUSES = ["PENDING", "SUBMITTED", "INCOMPLETE"];

exports.submitMilestoneEvidence = async (req, res) => {
    try {
        const { id, msId } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid pilot ID"
            });
        }

        if (!isValidObjectId(msId)) {
            return res.status(400).json({
                message: "Invalid milestone ID"
            });
        }

        const body = req.body || {};
        const evidenceNotes = typeof body.evidenceNotes === "string" ? body.evidenceNotes.trim() : "";
        const evidenceUrl = typeof (body.evidenceUrl || body.fileName) === "string"
            ? String(body.evidenceUrl || body.fileName).trim()
            : "";

        if (!evidenceNotes || !evidenceUrl) {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "evidenceNotes and evidenceUrl are required"
            });
        }

        const pilot = await Pilot.findById(id);

        if (!pilot) {
            return res.status(404).json({
                message: "Pilot not found"
            });
        }

        const milestone = await Milestone.findById(msId);

        if (!milestone) {
            return res.status(404).json({
                message: "Milestone not found"
            });
        }

        if (String(milestone.pilotId) !== String(pilot._id)) {
            return res.status(400).json({
                message: "Milestone does not belong to this pilot"
            });
        }

        const startup = await Startup.findOne({ userId: req.user._id });

        if (!startup || String(startup._id) !== String(pilot.startupId)) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        if (!SUBMITTABLE_STATUSES.includes(milestone.status)) {
            return res.status(400).json({
                message: "Milestone cannot accept evidence in its current status"
            });
        }

        milestone.evidenceNotes = evidenceNotes;
        milestone.evidenceUrl = evidenceUrl;
        milestone.submittedDate = new Date();
        milestone.status = "SUBMITTED";

        const updatedMilestone = await milestone.save();

        return res.status(201).json(updatedMilestone);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Submit milestone evidence error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

const VERIFIABLE_STATUSES = ["SUBMITTED", "UNDER_VERIFICATION"];

function parseApproval(body) {
    if (typeof body.isApproved === "boolean") {
        return body.isApproved;
    }
    if (typeof body.approved === "boolean") {
        return body.approved;
    }
    return undefined;
}

exports.verifyMilestone = async (req, res) => {
    try {
        const { id, msId } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid pilot ID"
            });
        }

        if (!isValidObjectId(msId)) {
            return res.status(400).json({
                message: "Invalid milestone ID"
            });
        }

        const body = req.body || {};
        const isApproved = parseApproval(body);

        if (typeof isApproved !== "boolean") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: "isApproved must be a boolean"
            });
        }

        const pilot = await Pilot.findById(id);

        if (!pilot) {
            return res.status(404).json({
                message: "Pilot not found"
            });
        }

        const milestone = await Milestone.findById(msId);

        if (!milestone) {
            return res.status(404).json({
                message: "Milestone not found"
            });
        }

        if (String(milestone.pilotId) !== String(pilot._id)) {
            return res.status(400).json({
                message: "Milestone does not belong to this pilot"
            });
        }

        const hasEvidence = Boolean(
            (milestone.evidenceUrl && String(milestone.evidenceUrl).trim()) ||
            (milestone.evidenceNotes && String(milestone.evidenceNotes).trim())
        );

        if (!hasEvidence || !VERIFIABLE_STATUSES.includes(milestone.status)) {
            return res.status(400).json({
                message: "Milestone does not have required evidence for verification"
            });
        }

        milestone.status = isApproved ? "VERIFIED" : "INCOMPLETE";
        milestone.verifiedDate = new Date();
        milestone.verifiedBy = req.user._id;

        if (body.verificationComments !== undefined || body.comments !== undefined) {
            const comments = body.verificationComments !== undefined
                ? body.verificationComments
                : body.comments;
            milestone.verificationComments = comments;
        }

        const updatedMilestone = await milestone.save();

        return res.status(200).json(updatedMilestone);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Verify milestone error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

exports.releaseMilestonePayment = async (req, res) => {
    try {
        const { id, msId } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid pilot ID"
            });
        }

        if (!isValidObjectId(msId)) {
            return res.status(400).json({
                message: "Invalid milestone ID"
            });
        }

        const pilot = await Pilot.findById(id);

        if (!pilot) {
            return res.status(404).json({
                message: "Pilot not found"
            });
        }

        const milestone = await Milestone.findById(msId);

        if (!milestone) {
            return res.status(404).json({
                message: "Milestone not found"
            });
        }

        if (String(milestone.pilotId) !== String(pilot._id)) {
            return res.status(400).json({
                message: "Milestone does not belong to this pilot"
            });
        }

        if (milestone.status !== "VERIFIED") {
            return res.status(400).json({
                message: "Milestone must be verified before payment can be released"
            });
        }

        if (milestone.paymentStatus === "RELEASED") {
            return res.status(400).json({
                message: "Payment has already been released"
            });
        }

        milestone.paymentStatus = "RELEASED";

        const updatedMilestone = await milestone.save();

        return res.status(200).json(updatedMilestone);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid or missing request data",
                details: error.message
            });
        }

        console.error("Release milestone payment error:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
