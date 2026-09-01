const express = require("express");
const { getStartupProfile, updateStartupProfile } = require("../controllers/startupController");

const router = express.Router();

router.get("/profile", getStartupProfile);
router.patch("/profile", updateStartupProfile);

module.exports = router;
