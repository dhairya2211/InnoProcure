const express = require("express");
const { getStartups, createStartup, getStartupProfile, updateStartupProfile } = require("../controllers/startupController");

const router = express.Router();

router.get("/", getStartups);
router.post("/", createStartup);
router.get("/profile", getStartupProfile);
router.patch("/profile", updateStartupProfile);

module.exports = router;
