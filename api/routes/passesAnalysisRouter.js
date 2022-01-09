const express = require("express");
const router = express.Router();

const passesAnalysisController = require("../controllers/passesAnalysisController");


router.get(
	"/:op1_ID/:op2_ID/:date_from/:date_to",
	passesAnalysisController.getPassesAnalysis
);

module.exports = router;
