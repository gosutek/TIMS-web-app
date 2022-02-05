const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = require("../server")

const mockData = {
    operators: require("../data/operatorsMockData.json"),
    passes: require("../data/passesMockData.json"),
    stations: require("../data/stationsMockData.json"),
    tags: require("../data/tagsMockData.json"),
    vehicles: require("../data/vehiclesMockData.json")
}
module.exports = {
    validateDBConnection: async function () {
        try {
			await db.authenticate();
			console.log("Succefully connected to database!");
			return ({
				status: "OK",
				dbconnection:
					"username: " +
					config.username +
					" | password: " +
					config.password +
					" | database_name: " +
					config.database +
					" | dialect: " +
					config.dialect
			});
		} catch (err) {
			console.log("Connection to database failed ->" + err.stack);
			return ({ status: "Failed", error: err.stack });
		}
    },
    resetDatabase: async function () {
        try {
            await db.drop();

            await db.sync();

            await db.queryInterface.bulkInsert("Operators", mockData.operators)
            await db.queryInterface.bulkInsert("Vehicles", mockData.vehicles)
            await db.queryInterface.bulkInsert("Stations", mockData.stations)
            await db.queryInterface.bulkInsert("Tags", mockData.tags)
            await db.queryInterface.bulkInsert("Passes", mockData.passes)

            return ({status: "OK"})

        } catch (err) {
            console.log("Unable to reset database->" + err.stack)
            return({status: "Failed", error: err.stack})
        }
    }
};