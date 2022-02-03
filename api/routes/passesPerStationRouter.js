const express = require("express");
const router = express.Router();

const passesPerStationController = require("../controllers/passesPerStationController");

router.get("/:stationID/:date_from/:date_to",
	passesPerStationController.getPassesPerStation
);

module.exports = router;
