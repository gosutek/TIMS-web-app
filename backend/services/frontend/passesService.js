const db = require("../../");
const moment = require("moment");
const object2csv = require("../../utils/object2csv");
const InvalidDate = require("../../error/invalidDate");

function ResponseObject(
    PassesList
) {
    this.PassesList = PassesList;
}

function PassEntry(
    StationID,
    StationOperator,
    TagID,
    TagProvider,
    PassType,
    Charge,
    TimeStamp
) {
    this.StationID = StationID;
    this.StationOperator = StationOperator;
    this.TagID = TagID;
    this.TagProvider = TagProvider;
    this.PassType = PassType;
    this.Charge = Charge;
    this.TimeStamp = TimeStamp;
}


async function getAllPassesData() {
    const [passesResults, passesResultsMetadata] = await db.query(
        `SELECT p.id         as passId,
				p.charge     as charge,
				p.timestamp  as passTimestamp,
				v.id         as vehicleId,
				s.id         as stationId,
                t.id         as tagId,
				s.OperatorId as stationOperator,
				t.OperatorId as tagOperator
         FROM Passes p,
              Stations s,
              Vehicles v,
              Tags t
         WHERE p.StationId = s.id
           AND p.TagId = t.id
           AND t.VehicleId = v.id
         ORDER BY passTimestamp ASC`,
        {
            replacements: {
            }
        }
    );

    let responseObject = new ResponseObject();

    responseObject.PassesList = passesResults.map((pass) => {
        let passType =
            pass.stationOperator == pass.tagOperator
                ? "home"
                : "visitor";

        return new PassEntry(
            pass.stationId,
            pass.stationOperator,
            pass.tagId,
            pass.tagProvider,
            passType,
            pass.charge,
            pass.passTimestamp
        );
    });

    return JSON.stringify(responseObject)
}

async function postNewPass(requestBody) {
    const letters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newId = '';
    const lettersLength = letters.length;

    for ( let i = 0; i < 15; i++ ) {
        newId += letters.charAt(Math.floor(Math.random() * lettersLength));
    }

    await db.query(
        `INSERT INTO Passes (id, timestamp, charge, StationId, TagId)
         VALUES (:passId, :passTimestamp , :charge , :stationId, :tagId);
        `,
        {
            replacements: {
                passId: newId,
                passTimestamp: requestBody.timestamp,
                charge: requestBody.charge,
                stationId: requestBody.stationId,
                tagId: requestBody.tagId
            }
        }
    );   console.log(requestBody)
}

module.exports = {getAllPassesData, postNewPass}