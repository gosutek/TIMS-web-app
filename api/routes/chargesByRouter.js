const express = require("express");
const router = express.Router();

const chargesByController = require("../controllers/chargesByController");

router.get(
	"/:op_ID/:date_from/:date_to",
	chargesByController.getChargesBy
);

module.exports = router;
