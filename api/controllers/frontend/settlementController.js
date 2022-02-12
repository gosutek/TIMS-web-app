const getSettlementData = require("../../../backend/services/frontend/settlementService");
const InvalidDate = require("../../error/invalidDate");

module.exports = {
	getSettlementData: async function (req, res) {
		try {
			let settlementData = await getSettlementData(req.params.op1_ID, req.params.op2_ID, req.params.date_from, req.params.date_to, req.params.format)

			if (JSON.parse(settlementData).PassesList.length == 0) {
				res.statusCode = 402;
				res.json({status: "No Data Found"});
				return;
			}

			res.setHeader("content-type", "application/json");

			res.send(settlementData);
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
