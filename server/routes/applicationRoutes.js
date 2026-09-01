const express = require("express");
const { scoreApplication, shortlistApplication } = require("../controllers/applicationController");

const router = express.Router();

router.post("/:id/score", scoreApplication);
router.post("/:id/shortlist", shortlistApplication);

module.exports = router;
