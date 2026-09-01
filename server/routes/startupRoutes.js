const express = require("express");
const { getStartupProfile } = require("../controllers/startupController");

const router = express.Router();

router.get("/profile", getStartupProfile);

module.exports = router;
