const express = require("express");
const router = express.Router();

const settlementController = require("../../controllers/frontend/settlementController");

router.get(
	"/:op1_ID/:op2_ID/:date_from/:date_to",
	settlementController.getSettlementData
);

module.exports = router;
