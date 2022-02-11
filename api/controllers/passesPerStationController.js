const getPassesPerStationData = require("../../backend/services/passesPerStationService");
const InvalidDate = require("../../backend/error/invalidDate");

module.exports = {
	getPassesPerStation: async function (req, res) {
		try {
			let passesPerStationData = await getPassesPerStationData(req.params.stationID, req.params.date_from, req.params.date_to, req.query.format)

			if (req.query.format == "csv") {
				if (passesPerStationData == "") {
					res.statusCode = 402;
					res.json({status: "No Data Found"});
					return;
				}
				res.setHeader("content-type", "text/csv");
			} else {
				if (JSON.parse(passesPerStationData).PassesList.length == 0) {
					res.statusCode = 402;
					res.json({status: "No Data Found"});
					return;
				}
				res.setHeader("content-type", "application/json");
			}

			res.send(passesPerStationData);
		} catch (err) {
			if (err instanceof InvalidDate) {
				res.statusCode = err.code;
				res.json({
					status: "BAD REQUEST",
					code: err.code,
					Reason: err.message,
					Info: "Date must be of format YYYYMMDD"
				});
			} else {
				res.statusCode = 500;
				res.json({
					status: "INTERNAL SERVER ERROR",
					code: 500,
					Reason: "Check CLI",
					Info: "No Info"
				});
			}
			console.log("Error ->" + err.stack);
		}
	}
};
