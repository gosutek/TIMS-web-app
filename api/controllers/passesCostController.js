const getPassesCostData = require("../../backend/services/passesCostService");
const InvalidDate = require("../../backend/error/invalidDate");

module.exports = {
	getPassesCost: async function (req, res) {
		try {
			let passesCostData = await getPassesCostData(req.params.op1_ID, req.params.op2_ID, req.params.date_from, req.params.date_to, req.query.format)

			// if (passesCostData == null) {
			// 	res.statusCode = 402;
			// 	res.json({status: "No Data Found"});
			// 	return;
			// }

			if (req.query.format == "csv") {
				res.setHeader("content-type", "text/csv");
			} else {
				res.setHeader("content-type", "application/json");
			}

			res.send(passesCostData);
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
	}
};
