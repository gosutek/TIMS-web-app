const db = require("../../backend");
const moment = require("moment");
const object2csv = require("../utils/object2csv");
const InvalidDate = require("../error/invalidDate")

function ResponseObject(
	StationOperator,
	TagProvider,
	RequestTimestamp,
	PeriodFrom,
	PeriodTo,
	NumberOfPasses,
	PassesCost
) {
	this.op1_ID = StationOperator;
	this.op2_ID = TagProvider;
	this.RequestTimestamp = RequestTimestamp;
	this.PeriodFrom = PeriodFrom;
	this.PeriodTo = PeriodTo;
	this.NumberOfPasses = NumberOfPasses;
	this.PassesCost = PassesCost;
}


module.exports = {
	getPassesCost: async function (req, res) {
		try {
			/*Date From */
			let dateFromParam = moment(req.params.date_from, "YYYYMMDD", true);
			if (!dateFromParam.isValid()) {
				throw new InvalidDate("Date_from is an invalid date");
			}
			dateFromParam = moment(dateFromParam).format("YYYY-MM-DD HH:mm:ss");
			/*Date To */
			let dateToParam = moment(req.params.date_to, "YYYYMMDD", true);
			if (!dateToParam.isValid()) {
				throw new InvalidDate("Date_to is an invalid date");
			}
			dateToParam = moment(dateToParam)
				.add(23, "hours")
				.add(59, "minutes")
				.add(59, "seconds")
				.format("YYYY-MM-DD HH:mm:ss");

			const [passesResults, passesMetadata] = await db.query(
				`SELECT SUM(p.charge) AS totalCost FROM Passes p, Stations s, Vehicles v 
                WHERE p.stationRef = s.stationID 
                AND p.vehicleRef = v.vehicleID
                AND s.stationProvider = :op1_ID
                AND v.tagProvider = :op2_ID
                AND p.timestamp BETWEEN :dateFrom AND :dateTo 
                ORDER BY p.timestamp ASC`,
				{
					replacements: {
						op1_ID: req.params.op1_ID,
						op2_ID: req.params.op2_ID,
						dateFrom: dateFromParam,
						dateTo: dateToParam
					}
				}
			);

			if (passesResults.length == 0) {
				res.statusCode = 402;
				res.json({ status: "No Data Found" });
				return;
			}
			const responseObject = new ResponseObject(
				req.params.op1_ID,
				req.params.op2_ID,
				moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
				dateFromParam,
				dateToParam,
				passesResults.length,
				passesResults[0].totalCost
			);

			if (req.query.format == "csv") {
				res.setHeader("content-type", "text/csv");
				res.send(object2csv(responseObject.PassesCost));
			} else {
				res.setHeader("content-type", "application/json");
				res.send(JSON.stringify(responseObject));
			}
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
