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
    resetStations: async function () {
/*         try {
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
 */    },
    resetPasses: async function() {
        try {
            console.log("Destroying Passes...");
            db.models.Pass.destroy({ where: {}, truncate: true });

            console.log("Syncing Database...");
            await db.sync();

            console.log("Populating Passes...");
            db.queryInterface.bulkInsert("Passes", mockData.passes)
            console.log("Done!");
            return({ status: "OK" });
        } catch (err) {
            console.log("Unable to reset passes ->" + err.stack);
            return({ stats: "Failed", error: err.stack });
        }
    },
    resetOperators: async function() {

    },
    resetTags: async function() {

    },
    resetVehicles: async function() {
        
    }
};