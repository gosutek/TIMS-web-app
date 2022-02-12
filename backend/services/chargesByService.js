const db = require("../");
const moment = require("moment");
const object2csv = require("../utils/object2csv");

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
	let dateFromParam = moment(dateFrom, "YYYYMMDD", true).format(
		"YYYY-MM-DD HH:mm:ss"
	);
	let dateToParam = moment(dateTo, "YYYYMMDD", true)
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
		if (responseObject.PPOList.length == 0) {
			return "";
		}
		let constantValues = JSON.parse(JSON.stringify(responseObject));
		delete constantValues.PPOList;
		let objectForCsv = responseObject.PPOList.map((passEntry) => {
			return { ...constantValues, ...passEntry };
		});
		return object2csv(objectForCsv);
	} else {
		return JSON.stringify(responseObject);
	}
}

module.exports = getChargesByData;
