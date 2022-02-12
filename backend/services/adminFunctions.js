const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = require("../server")
const fs = require("fs")

module.exports = {
    validateDBConnection: async function () {
        try {
			await db.authenticate();
			console.log("Succefully connected to database!");
			return ({
				status: "OK",
				dbconnection: {
                    username: config.username,
                    password: config.password,
                    database_name: config.database,
                    dialect: config.dialect
                }
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
            var mockData = {
                operators: JSON.parse(fs.readFileSync(__dirname + "/../data/operatorsMockData.json", "utf-8")),
                passes: JSON.parse(fs.readFileSync(__dirname + "/../data/passesMockData.json", "utf-8")),
                stations: JSON.parse(fs.readFileSync(__dirname + "/../data/stationsMockData.json", "utf-8")),
                tags: JSON.parse(fs.readFileSync(__dirname + "/../data/tagsMockData.json", "utf-8")),
                vehicles: JSON.parse(fs.readFileSync(__dirname + "/../data/vehiclesMockData.json", "utf-8")),
            }
            await db.queryInterface.bulkInsert("Operators", mockData.operators, /* {logging: console.log} */)
            await db.queryInterface.bulkInsert("Vehicles", mockData.vehicles, /* {logging: console.log} */)
            await db.queryInterface.bulkInsert("Stations", mockData.stations, /* {logging: console.log} */)
            await db.queryInterface.bulkInsert("Tags", mockData.tags, /* {logging: console.log} */)
            await db.queryInterface.bulkInsert("Passes", mockData.passes, /* {logging: console.log} */)

            return ({status: "OK"})

        } catch (err) {
            console.log("Unable to reset database->" + err.stack)
            return({status: "Failed", error: err.stack})
        }
    }
};