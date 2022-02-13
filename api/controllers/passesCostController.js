const getPassesCostData = require("../../backend/services/passesCostService");
const { InvalidDate } = require("../error/errorHandler");

module.exports = {
	getPassesCost: async function (req, res) {
		try {
			let passesCostData = await getPassesCostData(
				req.params.op1_ID,
				req.params.op2_ID,
				req.params.date_from,
				req.params.date_to,
				req.query.format
			);

			if (req.query.format == "csv") {
				if (passesCostData == "") {
					res.statusCode = 402;
					res.json({ status: "No Data Found" });
					return;
				}
				res.setHeader("content-type", "text/csv");
			} else {
				if (JSON.parse(passesCostData).PassesCost == null) {
					res.statusCode = 402;
					res.json({ status: "No Data Found" });
					return;
				}
				res.setHeader("content-type", "application/json");
			}

			res.send(passesCostData);
		} catch (err) {
			res.statusCode = 500;
			res.json({
				status: "INTERNAL SERVER ERROR",
				code: 500,
				Reason: "Check CLI",
				Info: "No Info"
			});
			console.log("Error ->" + err.stack);
		}
	}
};
