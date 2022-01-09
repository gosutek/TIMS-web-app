const express = require("express");
const router = express.Router();

const passesCostController = require("../controllers/passesCostController");

router.get(
	"/:op1_ID/:op2_ID/:date_from/:date_to",
	passesCostController.getPassesCost
);

module.exports = router;
