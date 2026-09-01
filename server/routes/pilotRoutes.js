const express = require("express");
const { getPilotById } = require("../controllers/pilotController");

const router = express.Router();

router.get("/:id", getPilotById);

module.exports = router;
