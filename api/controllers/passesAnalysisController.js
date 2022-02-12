const getPassesAnalysisData = require("../../backend/services/passesAnalysisService");
const { InvalidDate } = require("../error/errorHandler");

module.exports = {
	getPassesAnalysis: async function (req, res) {
		try {
			let passesAnalysisData = await getPassesAnalysisData(
				req.params.op1_ID,
				req.params.op2_ID,
				req.params.date_from,
				req.params.date_to,
				req.query.format
			);

			if (req.query.format == "csv") {
				if (passesAnalysisData == "") {
					res.statusCode = 402;
					res.json({ status: "No Data Found" });
					return;
				}
				res.setHeader("content-type", "text/csv");
			} else {
				if (JSON.parse(passesAnalysisData).PassesList.length == 0) {
					res.statusCode = 402;
					res.json({ status: "No Data Found" });
					return;
				}
				res.setHeader("content-type", "application/json");
			}

			res.send(passesAnalysisData);
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
