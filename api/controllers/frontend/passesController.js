const passesService = require("../../../backend/services/frontend/passesService");
const InvalidDate = require("../../../backend/error/invalidDate");

module.exports = {
	getAllPasses: async function (req, res) {
		try {
			let passesData = await passesService.getAllPassesData()

			if (JSON.parse(passesData).PassesList.length == 0) {
				res.statusCode = 402;
				res.json({status: "No Data Found"});
				return;
			}

			res.setHeader("content-type", "application/json");

			res.send(passesData);
		} catch (err) {
			if (err instanceof InvalidDate) {
				res.statusCode = err.code;
				res.json({
					status: "BAD REQUEST",
					code: err.code,
					Reason: err.message,
					Info: "Date must be of format YYYYMMDD"
				});
			} else {
				res.statusCode = 500;
				res.json({
					status: "INTERNAL SERVER ERROR",
					code: 500,
					Reason: "Check CLI",
					Info: "No Info"
				});
			}
			console.log("Error ->" + err.stack);
		}
	},

	postNewPass: async function (req, res) {
		try {
			await passesService.postNewPass(req.body)

			res.statusCode = 200
			res.send(req.body)
		} catch (err) {
			res.statusCode = 500;
			res.json({
				status: "INTERNAL SERVER ERROR",
				code: 500,
				Reason: "Check CLI",
				Info: "No Info"
			});
		}
	}
};
