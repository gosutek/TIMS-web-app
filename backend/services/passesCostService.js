const db = require("../");
const moment = require("moment");
const object2csv = require("../utils/object2csv");

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

async function getPassesCostData(op1ID, op2ID, dateFrom, dateTo, dataFormat) {
	let dateFromParam = moment(dateFrom, "YYYYMMDD", true).format(
		"YYYY-MM-DD HH:mm:ss"
	);

	let dateToParam = moment(dateTo, "YYYYMMDD", true)
		.add(23, "hours")
		.add(59, "minutes")
		.add(59, "seconds")
		.format("YYYY-MM-DD HH:mm:ss");

	const [passesResults, passesMetadata] = await db.query(
		`SELECT SUM(p.charge) as totalCost, COUNT(*) as numberOfPasses
				 FROM Passes p,
					  Stations s,
					  Vehicles v,
					  Tags t
				 WHERE p.StationId = s.id
				   AND p.TagId = t.id
				   AND t.VehicleId = v.id
				   AND s.OperatorId = :op1_ID
				   AND t.OperatorId = :op2_ID
				   AND p.timestamp BETWEEN :dateFrom AND :dateTo
				 ORDER BY p.timestamp ASC
				`,
		{
			replacements: {
				op1_ID: op1ID,
				op2_ID: op2ID,
				dateFrom: dateFromParam,
				dateTo: dateToParam
			}
		}
	);

	if (passesResults.length == 0) {
		return null;
	}

	const responseObject = new ResponseObject(
		op1ID,
		op2ID,
		moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		dateFromParam,
		dateToParam,
		passesResults[0].numberOfPasses,
		passesResults[0].totalCost
	);

	if (dataFormat == "csv") {
		return object2csv([responseObject]);
	} else {
		return JSON.stringify(responseObject);
	}
}

module.exports = getPassesCostData;
