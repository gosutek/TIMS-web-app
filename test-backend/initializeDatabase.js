const admin = require("../backend/services/adminFunctions");
const db = require("../backend/");
const {printTestInfo} = require("./auxiliary");

async function initializeDB() {
    await printTestInfo("Initializing Database...")
    await admin.emptyDatabase()

    await printTestInfo("Reseting Stations/Vehicles/Passes")
    await admin.resetStations()
    await admin.resetVehicles()
    await admin.resetPasses()

    await printTestInfo("Adding Test Data")
    await addTestData()

    await printTestInfo("Initialization Done")
}

async function addTestData() {
    await insertPassToDB("1","2020-04-02 14:24:52", 2.4, "07855cr60P8O3N9", "NE09V3603")
    await insertPassToDB("2","2020-04-05 12:21:12", 2.3, "1mv8ZN316KYs25W", "NE31Q7933")
    await insertPassToDB("3","2020-05-24 08:27:32", 2.8, "07855cr60P8O3N9", "NE43B7275")
    await insertPassToDB("4","2020-05-15 18:13:47", 1.5, "1mv8ZN316KYs25W", "MR06V9056")
    await insertPassToDB("5","2020-06-04 21:55:25", 3.1, "2O24G0KU04A8K91", "MR26E3126")
    await insertPassToDB("6","2020-06-04 05:31:13", 2.4, "6324cH2b515J4y2", "MR30M7731")
    await insertPassToDB("7","2020-06-08 09:07:24", 2.7, "2O24G0KU04A8K91", "MR39O1247")
}

async function insertPassToDB(id, timestamp, charge, stationId, tagId) {
    await db.query(
        `INSERT INTO Passes (id, timestamp, charge, StationId, TagId)
         VALUES (:passId, :passTimestamp , :charge , :stationId, :tagId);
        `,
        {
            replacements: {
                passId: id,
                passTimestamp: timestamp,
                charge: charge,
                stationId: stationId,
                tagId: tagId
            }
        }
    )
}

async function restoreDB() {
    await printTestInfo("Restoring Database...")
    await admin.emptyDatabase()

    await printTestInfo("Reseting Stations/Vehicles/Passes")
    await admin.resetStations()
    await admin.resetVehicles()
    await admin.resetPasses()

    await printTestInfo("Tests Finished")
}

module.exports = {initializeDB,restoreDB}
