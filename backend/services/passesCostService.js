const db = require("../");
const moment = require("moment");
const object2csv = require("../utils/object2csv");
const InvalidDate = require("../error/invalidDate");

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
	/*Date From */
	let dateFromParam = moment(dateFrom, "YYYYMMDD", true);
	if (!dateFromParam.isValid()) {
		throw new InvalidDate("Date_from is an invalid date");
	}
	dateFromParam = moment(dateFromParam).format("YYYY-MM-DD HH:mm:ss");
	/*Date To */
	let dateToParam = moment(dateTo, "YYYYMMDD", true);
	if (!dateToParam.isValid()) {
		throw new InvalidDate("Date_to is an invalid date");
	}
	dateToParam = moment(dateToParam)
		.add(23, "hours")
		.add(59, "minutes")
		.add(59, "seconds")
		.format("YYYY-MM-DD HH:mm:ss");

	const [passesResults, passesMetadata] = await db.query(
		`SELECT SUM(p.charge) as totalCost
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
		passesResults.length,
		passesResults[0].totalCost
	);

	if (dataFormat == "csv") {
		return object2csv(responseObject.PPOList)
	} else {
		return JSON.stringify(responseObject)
	}
}

module.exports = getPassesCostData