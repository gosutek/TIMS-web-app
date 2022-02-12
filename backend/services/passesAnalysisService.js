const db = require("../");
const moment = require("moment");
const object2csv = require("../utils/object2csv");

function ResponseObject(
	Station,
	StationOperator,
	RequestTimestamp,
	PeriodFrom,
	PeriodTo,
	NumberOfPasses,
	PassesList
) {
	this.op1_ID = Station;
	this.op2_ID = StationOperator;
	this.RequestTimestamp = RequestTimestamp;
	this.PeriodFrom = PeriodFrom;
	this.PeriodTo = PeriodTo;
	this.NumberOfPasses = NumberOfPasses;
	this.PassesList = PassesList;
}

function PassEntry(PassIndex, PassID, StationID, TimeStamp, VehicleID, Charge) {
	this.PassIndex = PassIndex;
	this.PassID = PassID;
	this.StationID = StationID;
	this.TimeStamp = TimeStamp;
	this.VehicleID = VehicleID;
	this.Charge = Charge;
}

async function getPassesAnalysisData(
	op1ID,
	op2ID,
	dateFrom,
	dateTo,
	dataFormat
) {
	let dateFromParam = moment(dateFrom, "YYYYMMDD", true).format(
		"YYYY-MM-DD HH:mm:ss"
	);
	let dateToParam = moment(dateTo, "YYYYMMDD", true)
		.add(23, "hours")
		.add(59, "minutes")
		.add(59, "seconds")
		.format("YYYY-MM-DD HH:mm:ss");

	const [passesResults, passesMetadata] = await db.query(
		`SELECT p.id        as passId,
				p.charge    as charge,
				p.timestamp as passTimestamp,
				v.id        as vehicleId,
				s.id        as StationId
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
		 ORDER BY passTimestamp ASC
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

	const responseObject = new ResponseObject(
		op1ID,
		op2ID,
		moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		dateFromParam,
		dateToParam,
		passesResults.length,
		[]
	);

	let count = 0;
	responseObject.PassesList = passesResults.map((pass) => {
		count = count + 1;
		return new PassEntry(
			count,
			pass.passId,
			pass.StationId,
			(pass.passTimestamp = moment(pass.passTimestamp).format(
				"YYYY-MM-DD HH:mm:ss"
			)),
			pass.vehicleId,
			pass.charge
		);
	});

	if (dataFormat == "csv") {
		if (responseObject.PassesList.length == 0) {
			return "";
		}
		let constantValues = JSON.parse(JSON.stringify(responseObject));
		delete constantValues.PassesList;
		let objectForCsv = responseObject.PassesList.map((passEntry) => {
			return { ...constantValues, ...passEntry };
		});
		return object2csv(objectForCsv);
	} else {
		return JSON.stringify(responseObject);
	}
}

module.exports = getPassesAnalysisData;
