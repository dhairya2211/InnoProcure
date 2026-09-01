const express = require("express");
const { getPilotById, submitMilestoneEvidence, verifyMilestone, releaseMilestonePayment } = require("../controllers/pilotController");
const { protect, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
    "/:id/milestones/:msId/evidence",
    protect,
    requireRole("startup"),
    submitMilestoneEvidence
);
router.patch(
    "/:id/milestones/:msId/verify",
    protect,
    requireRole("evaluator"),
    verifyMilestone
);
router.patch(
    "/:id/milestones/:msId/payment",
    protect,
    requireRole("evaluator"),
    releaseMilestonePayment
);
router.get("/:id", getPilotById);

module.exports = router;
