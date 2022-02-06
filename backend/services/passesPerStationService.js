const db = require("../");
const moment = require("moment");
const object2csv = require("../utils/object2csv");
const InvalidDate = require("../error/invalidDate");

function ResponseObject(
	Station,
	StationOperator,
	RequestTimestamp,
	PeriodFrom,
	PeriodTo,
	NumberOfPasses,
	PassesList
) {
	this.Station = Station;
	this.StationOperator = StationOperator;
	this.RequestTimestamp = RequestTimestamp;
	this.PeriodFrom = PeriodFrom;
	this.PeriodTo = PeriodTo;
	this.NumberOfPasses = NumberOfPasses;
	this.PassesList = PassesList;
}

function PassEntry(
	PassIndex,
	PassID,
	PassTimeStamp,
	VehicleID,
	TagProvider,
	PassType,
	PassCharge
) {
	this.PassIndex = PassIndex;
	this.PassID = PassID;
	this.PassTimeStamp = PassTimeStamp;
	this.VehicleID = VehicleID;
	this.TagProvider = TagProvider;
	this.PassType = PassType;
	this.PassCharge = PassCharge;
}

async function getPassesPerStationData(stationId, dateFrom, dateTo, dataFormat) {
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
		`SELECT p.id         as passId,
				p.charge     as charge,
				p.timestamp  as passTimestamp,
				v.id         as vehicleId,
				s.id         as StationId,
				s.OperatorId as stationOperator,
				t.OperatorId as tagOperator
		 FROM Passes p,
			  Stations s,
			  Vehicles v,
			  Tags t
		 WHERE p.StationId = :stationID
		   AND p.StationId = s.id
		   AND p.TagId = t.id
		   AND t.VehicleId = v.id
		   AND p.timestamp BETWEEN :dateFrom AND :dateTo
		 ORDER BY passTimestamp ASC`,
		{
			replacements: {
				stationID: stationId,
				dateFrom: dateFromParam,
				dateTo: dateToParam
			}
		}
	);

	let stationOperator = passesResults.length > 0 ? passesResults[0].stationOperator : null

	const responseObject = new ResponseObject(
		stationId,
		stationOperator,
		moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		dateFromParam,
		dateToParam,
		passesResults.length
	);

	let count = 0;
	responseObject.PassesList = passesResults.map((pass) => {
		count = count + 1;
		let passType =
			pass.stationOperator == pass.tagOperator
				? "home"
				: "visitor";
		return new PassEntry(
			count,
			pass.passId,
			(pass.passTimestamp = moment(pass.passTimestamp).format(
				"YYYY-MM-DD HH:mm:ss"
			)),
			pass.vehicleId,
			pass.tagOperator,
			passType,
			pass.charge
		);
	});

	if (dataFormat == "csv") {
		let constantValues = JSON.parse(JSON.stringify(responseObject))
		delete constantValues.PassesList
		let objectForCsv = responseObject.PassesList.map(passEntry => {
			return {...constantValues, ...passEntry}
		})
		return object2csv(objectForCsv)
	} else {
		return JSON.stringify(responseObject)
	}
}

module.exports = getPassesPerStationData