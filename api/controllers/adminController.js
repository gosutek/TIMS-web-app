const admin = require("../../backend/services/adminFunctions");

module.exports = {
	checkDatabaseConnection: (req, res) => {
		admin.validateDBConnection().then((json) => res.send(json));
	},
    emptyDatabase: (req, res) => {
        admin.emptyDatabase().then((json) => res.send(json));
    },
    resetPasses: (req, res) => {
        admin.resetPasses().then((json) => res.send(json));
    },
    resetStations: (req, res) => {
        admin.resetStations().then((json) => res.send(json));
    },
    resetVehicles: (req, res) => {
        admin.resetVehicles().then((json) => res.send(json));
    },
	addGeneratedData: (req, res) => {
		admin.addGeneratedData().then((json) => res.send(json));
	}
};
