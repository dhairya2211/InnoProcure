const express = require("express");
const { getChallenges, getChallengeById, createChallenge, updateChallenge } = require("../controllers/challengeController");
const { createApplication, getApplications } = require("../controllers/applicationController");

const router = express.Router();

router.get("/", getChallenges);
router.get("/:id/applications", getApplications);
router.get("/:id", getChallengeById);
router.post("/", createChallenge);
router.patch("/:id", updateChallenge);
router.post("/:id/applications", createApplication);

module.exports = router;
