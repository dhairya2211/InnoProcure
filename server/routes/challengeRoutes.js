const express = require("express");
const { getChallenges, getChallengeById, createChallenge } = require("../controllers/challengeController");
const { createApplication } = require("../controllers/applicationController");

const router = express.Router();

router.get("/", getChallenges);
router.get("/:id", getChallengeById);
router.post("/", createChallenge);
router.post("/:id/applications", createApplication);

module.exports = router;
