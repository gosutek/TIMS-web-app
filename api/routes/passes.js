const express = require('express');
const router = express.Router();

const passesPerStationController = require("../controllers/passesPerStationController");
const passesAnalysisController = require("../controllers/passesAnalysisController");

router.get("/PassesPerStation/:stationID/:date_from/:date_to", passesPerStationController.getPassesPerStation);
router.get("/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to", passesAnalysisController.getPassesAnalysis);

module.exports = router;