const express = require("express");
const { getChallenges, createChallenge } = require("../controllers/challengeController");

const router = express.Router();

router.get("/", getChallenges);
router.post("/", createChallenge);

module.exports = router;
