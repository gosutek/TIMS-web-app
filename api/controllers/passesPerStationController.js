const db = require("../../backend");
const moment = require('moment');

function ResponseObject(Station, StationOperator, RequestTimestamp, PeriodFrom, PeriodTo, NumberOfPasses, PassesList) {
    this.Stations = Station
    this.StationOperator = StationOperator
    this.RequestTimestamp = RequestTimestamp
    this.PeriodFrom = PeriodFrom
    this.PeriodTo = PeriodTo
    this.NumberOfPasses = NumberOfPasses
    this.PassesList = PassesList
}

function PassEntry(PassIndex, PassID, PassTimeStamp, VehicleID, TagProvider, PassType, PassCharge) {
    this.PassIndex = PassIndex
    this.PassID = PassID
    this.PassTimeStamp = PassTimeStamp
    this.VehicleID = VehicleID
    this.TagProvider = TagProvider
    this.PassType = PassType
    this.PassCharge = PassCharge
}

module.exports = {
    getPassesPerStation: async function (req, res) {
        try {
            const [stationResults, stationMetadata] = await db.query("SELECT * FROM Stations WHERE stationID=:stationID",
                {
                    replacements: {
                        stationID: req.params.stationID
                    }
                });

            const [passesResults, passesMetadata] = await db.query(
                `SELECT * FROM Passes p, Stations s, Vehicles v WHERE p.stationRef=:stationID 
                 AND p.stationRef = s.stationID 
                 AND p.vehicleRef = v.vehicleID 
                 AND p.timestamp BETWEEN :dateFrom AND :dateTo 
                 ORDER BY p.timestamp ASC`,
                {
                    replacements: {
                        stationID: req.params.stationID,
                        dateFrom: req.params.date_from,
                        dateTo: req.params.date_to
                    }
                });

            const responseObject = new ResponseObject(req.params.stationID, stationResults[0].stationProvider, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                req.params.date_from, req.params.date_to, passesResults.length)

            let count = 0
            responseObject.passesList =  passesResults.map(pass => {
                count = count + 1
                let passType = pass.tagProvider == stationResults[0].stationProvider ? "home" : "away"
                return new PassEntry(count,pass.passID,pass.timestamp = moment(pass.timestamp).format("YYYY-MM-DD HH:mm:ss"),
                    pass.vehicleRef, pass.tagProvider, passType, pass.charge)
            })

            res.setHeader('content-type', 'application/json');
            res.send(JSON.stringify(responseObject))
        } catch (err) {
            res.json ({ status: "Failed", error: err.stack });
        }
    }
};
