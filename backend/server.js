const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];

const db = require('./models')

module.exports = {
	checkDatabaseConnection: async function () {
		try {
			await db.sequelize.authenticate();
			console.log("Succefully connected to database!");
			return {
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
			};
		} catch (err) {
			console.log("Connection to database failed ->" + err.stack);
			return { status: "Failed" };
		}
	},
	// add more functions here
};