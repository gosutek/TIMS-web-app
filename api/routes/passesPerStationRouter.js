const express = require("express");
const router = express.Router();
const moment = require("moment");

const InvalidDate = require("../error/invalidDate");

const passesPerStationController = require("../controllers/passesPerStationController");

router.get("/:stationID/:date_from/:date_to", (req, res) => {
	try {
		const date_from = moment(req.params.date_from, "YYYYMMDD", true);
		const date_to = moment(req.params.date_to, "YYYYMMDD", true);
		if (!date_from.isValid()) {
			throw new InvalidDate("Date_from is an invalid date");
		}
		if (!date_to.isValid()) {
			throw new InvalidDate("Date_to is an invalid date");
		}
		passesPerStationController.getPassesPerStation(req, res)
	} catch (err) {
		console.log(err.stack);
		res.statusCode = err.body.code;
		res.send(err.body.json);
	}
});

module.exports = router;
