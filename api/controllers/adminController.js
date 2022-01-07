const env = process.env.NODE_ENV || "development";
const config = require("../../backend/config/config.json")[env];
const path = require('path');

const db = require("../../backend");
const readCSV = require("../utils/read_csv");

module.exports = {
	checkDatabaseConnection: async function (req, res) {
		try {
			await db.authenticate();
			console.log("Succefully connected to database!");
			res.json ({
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
			res.json ({ status: "Failed", error: err });
		}
	},
    resetStations: async function(req, res) {
        try {
            console.log("Destroying Station...");
            db.models.Station.destroy({ where: {}, truncate: true });

            console.log("Syncing Database...");
            await db.sync();

            console.log("Populating Station...");
            readCSV(path.join(__dirname, "../../backend/data/sampledata01_stations.csv"))
            .then(stations => {
                db.queryInterface.bulkInsert('Stations', stations);
            })
            console.log("Done!");
            res.send ({ status: "OK" });
        } catch (err) {
            console.log("Unable to reset stations ->" + err.stack);
            res.send ({ status: "Failed", error: err.stack });
        }
    },
    resetVehicles: async function(req, res) {
        try {
            console.log("Destroying Vehicle...");
            db.models.Vehicle.destroy({ where: {}, truncate: true });

            console.log("Syncing Database...");
            await db.sync();
            
            console.log("Populating vehicles...");
            readCSV(path.join(__dirname, "../../backend/data/sampledata01_vehicles_100.csv"))
            .then(vehicles => {
                db.queryInterface.bulkInsert('Vehicles', vehicles);
            })
            console.log("Done!");
            res.send ({status: "OK"});
        } catch (err) {
            console.log("Unable to reset vehicles ->" + err.stack);
            res.send ({ status: "Failed", error: err.stack });
        }
    },
    /*resetPasses: async function (req, res) {
        try {
            console.log("Destroying Passes...");
            db.models.Pass.destroy({ where: {}, truncate: true });

            console.log("Syncing Database...");
            await db.sync();

            console.log("Populating passes...");
            readCSV(path.join(__dirname, "../../backend/data/sampledata01_passes100_8000.csv"))
            .then(passes => {
                db.queryInterface.bulkInsert('Passes', passes);
            })
            console.log("Done!");
            res.send ({ status: "OK" });
        } catch (err) {
            console.log("Unable to reset passes ->" + err.stack);
            res.send ({ stats: "Failed", error: err.stack });
        }
    }*/
};