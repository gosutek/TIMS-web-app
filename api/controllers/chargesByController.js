const getChargesByData = require("../../backend/services/chargesByService");
const { InvalidDate } = require("../error/errorHandler");

module.exports = {
	getChargesBy: async function (req, res) {
		try {
			let chargesByData = await getChargesByData(
				req.params.op_ID,
				req.params.date_from,
				req.params.date_to,
				req.query.format
			);

			if (req.query.format == "csv") {
				if (chargesByData == "") {
					res.statusCode = 402;
					res.json({ status: "No Data Found" });
					return;
				}
				res.setHeader("content-type", "text/csv");
			} else {
				if (JSON.parse(chargesByData).PPOList.length == 0) {
					res.statusCode = 402;
					res.json({ status: "No Data Found" });
					return;
				}
				res.setHeader("content-type", "application/json");
			}

			res.send(chargesByData);
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
