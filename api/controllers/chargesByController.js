const getChargesByData = require("../../backend/services/chargesByService");
const InvalidDate = require("../../backend/error/invalidDate");

module.exports = {
    getChargesBy: async function (req, res) {
        try {
            let chargesByData = await getChargesByData(req.params.op_ID, req.params.date_from, req.params.date_to, req.query.format)


            if (req.query.format == "csv") {
                if (chargesByData == "") {
                    res.statusCode = 402;
                    res.json({status: "No Data Found"});
                    return;
                }
                res.setHeader("content-type", "text/csv");
            } else {
                if (JSON.parse(chargesByData).PPOList.length == 0) {
                    res.statusCode = 402;
                    res.json({status: "No Data Found"});
                    return;
                }
                res.setHeader("content-type", "application/json");
            }

            res.send(chargesByData);
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
