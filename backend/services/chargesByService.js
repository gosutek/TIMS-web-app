const db = require("../");
const moment = require("moment");
const object2csv = require("../utils/object2csv");
const InvalidDate = require("../error/invalidDate");

function ResponseObject(
	StationProvider,
	RequestTimestamp,
	PeriodFrom,
	PeriodTo,
	PPOList
) {
	this.op_ID = StationProvider;
	this.RequestTimestamp = RequestTimestamp;
	this.PeriodFrom = PeriodFrom;
	this.PeriodTo = PeriodTo;
	this.PPOList = PPOList;
}

function PPO(VisitingOperator, NumberOfPasses, PassesCost) {
	this.VisitingOperator = VisitingOperator;
	this.NumberOfPasses = NumberOfPasses;
	this.PassesCost = PassesCost;
}


async function getChargesByData(opID, dateFrom, dateTo, dataFormat) {
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
		`SELECT t.OperatorId  as visitingOperator,
                        COUNT(*)      AS numberOfPasses,
                        SUM(p.charge) AS passesCost
                 FROM Passes p,
                      Stations s,
                      Vehicles v,
                      Tags t
                 WHERE p.StationId = s.id
                   AND p.TagId = t.id
                   AND t.VehicleId = v.id
                   AND s.OperatorId = :op_ID
                   AND t.OperatorId != s.OperatorId
                   AND p.timestamp BETWEEN :dateFrom AND :dateTo
                 GROUP BY visitingOperator`,
		{
			replacements: {
				op_ID: opID,
				dateFrom: dateFromParam,
				dateTo: dateToParam
			}
		}
	);

	const responseObject = new ResponseObject(
		opID,
		moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		dateFromParam,
		dateToParam,
		[]
	);

	responseObject.PPOList = passesResults.map((pass) => {
		return new PPO(
			pass.visitingOperator,
			pass.numberOfPasses,
			pass.passesCost
		);
	});

	if (dataFormat == "csv") {
		return object2csv(responseObject.PPOList)
	} else {
		return JSON.stringify(responseObject)
	}
}

module.exports = getChargesByData