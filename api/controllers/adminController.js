const admin = require("../../backend/services/adminFunctions");

module.exports = {
	checkDatabaseConnection: (req, res) => {
		admin.validateDBConnection().then(json => res.send(json))
	},
	resetDatabase: (req, res) => {
        admin.resetDatabase().then(json => res.send(json))
    }
};
