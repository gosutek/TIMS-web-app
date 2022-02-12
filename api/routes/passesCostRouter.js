const express = require("express");
const router = express.Router();
const moment = require("moment")

const {InvalidDate, MissingParams, SameOperator} = require("../error/errorHandler");

const passesCostController = require("../controllers/passesCostController");

router.get(
	[
		"/",
        "//",
        "///",
        "////",
		"/:op1_ID",
        "/:op1_ID///",
        "/:op1_ID/:op2_ID",
        "/:op1_ID/:op2_ID//",
		"/:op1_ID/:op2_ID/:date_from",
        "/:op1_ID/:op2_ID/:date_from/",
		"/:op1_ID//:date_from/:date_to",
        "//:op2_ID/:date_from/:date_to",
		"//:date_from/:date_to",
	],
	(req, res) => {
		const missing_params_err = new MissingParams("passesCost");
		console.log(
			"Error -> Missing parameters for passesCost endpoint \n URL: /:op1_ID/:op2_ID/:date_from/:date_to"
		);
		res.statusCode = missing_params_err.body.code;
		res.send(missing_params_err.body.json);
	}
);

router.get(
	"/:op1_ID/:op2_ID/:date_from/:date_to",
    (req, res) => {
        try {
            const date_from = moment(req.params.date_from, "YYYYMMDD", true);
            const date_to = moment(req.params.date_to, "YYYYMMDD", true);
            if (!date_from.isValid()) {
                throw new InvalidDate("Date_from is an invalid date");
            }
            if (!date_to.isValid()) {
                throw new InvalidDate("Date_to is an invalid date");
            }
            if (req.params.op1_ID === req.params.op2_ID) {
                throw new SameOperator("Can't analyze the passes of the same operator")
            }
            passesCostController.getPassesCost(req, res)
        } catch (err) {
            console.log(err.stack);
            res.statusCode = err.body.code
            res.send (err.body.json);
        }
    }
);

module.exports = router;
