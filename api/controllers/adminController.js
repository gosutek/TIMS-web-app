const admin = require("../../backend/api/adminFunctions");

module.exports = {
	checkDatabaseConnection: (req, res) => {
		admin.validateDBConnection().then(json => res.send(json))
	},
	resetStations: async function (req, res) {
		//admin.resetStations().then(json => res.send(json))
	},
	resetVehicles: async function (req, res) {
		//admin.resetVehicles().then(json => res.send(json))
	},
	resetPasses: (req, res) => {
		admin.resetPasses().then(json => res.send(json))
	},
    resetOperators: (req, res) => {
        //admin.resetOperators().then(json => res.send(json))
    },
    resetTags: (req, res) => {
        //admin.resetTags().then(json => res.send(json))
    }
};
