const db = require("../../backend");
const moment = require('moment');
const object2csv = require("../utils/object2csv");

function ResponseObject(Station, StationOperator, RequestTimestamp, PeriodFrom, PeriodTo, NumberOfPasses, PassesList) {
    this.op1_ID = Station
    this.op2_ID = StationOperator
    this.RequestTimestamp = RequestTimestamp
    this.PeriodFrom = PeriodFrom
    this.PeriodTo = PeriodTo
    this.NumberOfPasses = NumberOfPasses
    this.PassesList = PassesList
}

function PassEntry(PassIndex, PassID, StationID, TimeStamp, VehicleID, Charge) {
    this.PassIndex = PassIndex
    this.PassID = PassID
    this.StationID = StationID
    this.TimeStamp = TimeStamp
    this.VehicleID = VehicleID
    this.Charge = Charge
}

module.exports = {
    getPassesAnalysis: async function (req, res) {
        try {
            const [passesResults, passesMetadata] = await db.query(
                `SELECT * FROM Passes p, Stations s, Vehicles v 
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
                        dateFrom: req.params.date_from,
                        dateTo: req.params.date_to
                    }
                });

            const responseObject = new ResponseObject(req.params.op1_ID, req.params.op2_ID, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                req.params.date_from, req.params.date_to, passesResults.length, [])

            let count = 0
            responseObject.PassesList =  passesResults.map(pass => {
                count = count + 1
                return new PassEntry(count,pass.passID,pass.stationID, pass.timestamp = moment(pass.timestamp).format("YYYY-MM-DD HH:mm:ss"),
                    pass.vehicleRef,  pass.charge)
            })

            if (req.query.format == 'csv') {
                res.setHeader('content-type', 'text/csv');
                res.send(object2csv(responseObject.PassesList))
            } else {
                res.setHeader('content-type', 'application/json');
                res.send(JSON.stringify(responseObject))
            }

        } catch (err) {
            res.json ({ status: "Failed", error: err.stack });
        }
    }
};
