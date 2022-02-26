const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = require("../server")
const fs = require("fs")
const formatDefault = require("../utils/formatDefaultData")

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
    emptyDatabase: async function () {
        try {
            await db.drop();

            await db.sync();
            ops = JSON.parse(fs.readFileSync(__dirname + "/../data/operatorsMockData.json", "utf-8"))
            db.queryInterface.bulkInsert("Operators", ops)

            return ({ status: "OK" })
        } catch (err) {
            console.log("Unable to empty database")
            return ({ status: "Failed", Error: err.stack })
        }
    },
    resetPasses: async function () {
        try {
            await db.queryInterface.dropTable("Passes")
            await db.sync();

            let pDD = (await formatDefault()).pOut
            await db.queryInterface.bulkInsert("Passes", pDD);
            
            return ({status: "OK"})
        } catch (err) {
            console.log("Unable to reset passes")
            return({ status: "Failed", error: err.stack })
        }
    },
    resetStations: async function () {
        try {
            await db.query(`SET FOREIGN_KEY_CHECKS = 0`)
            await db.queryInterface.dropTable("Stations")
            await db.query(`SET FOREIGN_KEY_CHECKS = 1`)
            await db.sync();

            let sDD = (await formatDefault()).sOut
            await db.queryInterface.bulkInsert("Stations", sDD);
            genSt = JSON.parse(fs.readFileSync(__dirname + "/../data/stationsMockData.json", "utf-8"))
            await db.queryInterface.bulkInsert("Stations", genSt)

            return ({ status: "OK" })
        } catch (err) {
            console.log("Unable to reset stations")
            return ({ status: "Failed", error: err.stack })
        }
    },
    resetVehicles: async function () {
        try {
            await db.query(`SET FOREIGN_KEY_CHECKS = 0`)
            await db.queryInterface.dropTable("Tags")
            await db.queryInterface.dropTable("Vehicles")
            await db.query(`SET FOREIGN_KEY_CHECKS = 1`)
            await db.sync();

            let DD = await formatDefault()
            await db.queryInterface.bulkInsert("Vehicles", DD.vOut);
            await db.queryInterface.bulkInsert("Tags", DD.tOut);

            return ({ status: "OK" })
        } catch (err) {
            console.log("Unable to reset vehicles")
            return ({ status: "Failed", error: err.stack })
        }
    },
    addGeneratedData: async function () {
        try {
            var mockData = {
                passes: JSON.parse(fs.readFileSync(__dirname + "/../data/passesMockData.json", "utf-8")),
                stations: JSON.parse(fs.readFileSync(__dirname + "/../data/stationsMockData.json", "utf-8")),
                tags: JSON.parse(fs.readFileSync(__dirname + "/../data/tagsMockData.json", "utf-8")),
                vehicles: JSON.parse(fs.readFileSync(__dirname + "/../data/vehiclesMockData.json", "utf-8")),
            }
            await db.queryInterface.bulkInsert("Vehicles", mockData.vehicles)
            await db.queryInterface.bulkInsert("Tags", mockData.tags)
            await db.queryInterface.bulkInsert("Passes", mockData.passes)

            return ({status: "OK"})

        } catch (err) {
            console.log("Unable to add generated data ->" + err.stack)
            return({status: "Failed", error: err.stack})
        }
    }
};