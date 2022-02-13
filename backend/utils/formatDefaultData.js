const readCSV = require("../utils/read_csv");
const moment = require("moment");
const fs = require("fs");

const PASSES = "sampledata01_passes100_8000.csv";
const STATIONS = "sampledata01_stations.csv";
const VEHICLES = "sampledata01_vehicles_100.csv";

module.exports = async function formatDefault() {
	var [vehiclesOutput, stationsOutput, passesOutput, tagsOutput] = [[], [], [], []];
	await readCSV(__dirname + "/../data/default/" + VEHICLES).then((data) => {
		data.forEach((elem, index) => {
			vehiclesOutput[index] = {
				id: elem.vehicleID,
				licenseYear: elem.licenseYear,
				licensePlate: null,
				licenseCountry: null,
				vehicleType: null
			};
            let op = matchOP(elem.tagProvider)
			tagsOutput[index] = {
				id: elem.tagID,
				credits: null,
				OperatorId: op,
				VehicleId: elem.vehicleID
			};
		});
	});
	await readCSV(__dirname + "/../data/default/" + STATIONS).then((data) => {
		data.forEach((elem, index) => {
            let op = matchOP(elem.stationProvider)
			stationsOutput[index] = {
				id: elem.stationID,
				stationName: elem.stationName,
				OperatorId: op
			};
		});
	});
	await readCSV(__dirname + "/../data/default/" + PASSES).then((data) => {
		data.forEach((elem, index) => {
			const timestamp = moment(elem.timestamp, "DD/MM/YYYY HH:mm").format(
				"YYYY-MM-DD HH:mm:ss"
			);
			passesOutput[index] = {
				id: elem.passID,
				timestamp: timestamp,
				charge: elem.charge,
				StationId: elem.stationRef,
				TagId: elem.vehicleRef
			};
		});
	});
    return { vOut: vehiclesOutput, tOut: tagsOutput, sOut: stationsOutput, pOut: passesOutput};
};

function matchOP(elem) {
    let genOps = JSON.parse(fs.readFileSync(__dirname + "/../data/operatorsMockData.json"))
    return (genOps.find((element) => element.operatorName === elem)).id
}
