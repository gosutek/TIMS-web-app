const db = require("../../");
const moment = require("moment");
const object2csv = require("../../utils/object2csv");
const InvalidDate = require("../../error/invalidDate");

function ResponseObject(
    OwningOperator,
    StationOperator,
    AmountOwned,
    PassesList
) {
    this.OwningOperator = OwningOperator;
    this.StationOperator = StationOperator;
    this.AmountOwned = AmountOwned;
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


async function getSettlementData(op1ID, op2ID, dateFrom, dateTo) {
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

    const [passesResults, passesResultsMetadata] = await db.query(
        `SELECT p.id         as passId,
				p.charge     as charge,
				p.timestamp  as passTimestamp,
				v.id         as vehicleId,
				s.id         as stationId,
                t.id         as tagId,
				s.OperatorId as stationOperator,
				t.OperatorId as tagProvider
         FROM Passes p,
              Stations s,
              Vehicles v,
              Tags t
         WHERE p.StationId = s.id
           AND p.TagId = t.id
           AND t.VehicleId = v.id
           AND ((s.OperatorId = :op1_ID AND t.OperatorId = :op2_ID)
             OR (s.OperatorId = :op2_ID AND t.OperatorId = :op1_ID))
           AND p.timestamp BETWEEN :dateFrom AND :dateTo
         ORDER BY passTimestamp ASC`,
        {
            replacements: {
                op1_ID: op1ID,
                op2_ID: op2ID,
                dateFrom: dateFromParam,
                dateTo: dateToParam
            }
        }
    );

    const [amountOwned, amountOwnedMetadata] = await db.query(
        `SELECT SUM(p.charge) AS passesCost,
                t.OperatorId AS owningOperator
         FROM Passes p,
              Stations s,
              Vehicles v,
              Tags t
         WHERE p.StationId = s.id
           AND p.TagId = t.id
           AND t.VehicleId = v.id
           AND ((s.OperatorId = :op1_ID AND t.OperatorId = :op2_ID)
             OR (s.OperatorId = :op2_ID AND t.OperatorId = :op1_ID))
           AND p.timestamp BETWEEN :dateFrom AND :dateTo
         GROUP BY owningOperator`,
        {
            replacements: {
                op1_ID: op1ID,
                op2_ID: op2ID,
                dateFrom: dateFromParam,
                dateTo: dateToParam
            }
        }
    );

    let responseObject;

    if (amountOwned.length == 0) {
        responseObject = new ResponseObject(
            op1ID,
            op2ID,
            0,
            null
        );
    } else if (amountOwned.length == 1) {
        let owningOperator = "";
        let stationOperator = "";
        if (amountOwned[0].owningOperator == op1ID) {
            owningOperator = op1ID
            stationOperator = op2ID
        } else {
            owningOperator = op2ID
            stationOperator = op1ID
        }

        responseObject = new ResponseObject(
            owningOperator,
            stationOperator,
            amountOwned[0].passesCost,
            null
        );
    } else {
        let owningOperator = "";
        let stationOperator = "";
        let totalAmountOwned = 0.0;
        if (amountOwned[0].passesCost > amountOwned[1].passesCost) {
            owningOperator = amountOwned[0].owningOperator
            stationOperator = amountOwned[1].owningOperator
            totalAmountOwned = amountOwned[0].passesCost - amountOwned[1].passesCost
        } else {
            owningOperator = amountOwned[1].owningOperator
            stationOperator = amountOwned[0].owningOperator
            totalAmountOwned = amountOwned[1].passesCost - amountOwned[0].passesCost
        }

        responseObject = new ResponseObject(
            owningOperator,
            stationOperator,
            totalAmountOwned,
            null
        );
    }

    responseObject.PassesList = passesResults.map((pass) => {
        return new PassEntry(
            pass.stationId,
            pass.stationOperator,
            pass.tagId,
            pass.tagProvider,
            "visitor",
            pass.charge,
            pass.passTimestamp
        );
    });

    return JSON.stringify(responseObject)
}

module.exports = getSettlementData