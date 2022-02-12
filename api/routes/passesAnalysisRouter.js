const express = require("express");
const router = express.Router();
const moment = require("moment")

const SameOperator = require("../error/sameOperator")
const InvalidDate = require("../error/invalidDate")

const passesAnalysisController = require("../controllers/passesAnalysisController");


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
            passesAnalysisController.getPassesAnalysis(req, res)
        } catch (err) {
            console.log(err.stack);
            res.statusCode = err.body.code
            res.send (err.body.json);
        }
    }
);

module.exports = router;
