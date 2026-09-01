const express = require("express");
const { getPilotById, submitMilestoneEvidence } = require("../controllers/pilotController");
const { protect, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
    "/:id/milestones/:msId/evidence",
    protect,
    requireRole("startup"),
    submitMilestoneEvidence
);
router.get("/:id", getPilotById);

module.exports = router;
