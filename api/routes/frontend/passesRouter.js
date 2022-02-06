const express = require("express");
const router = express.Router();

const passesController = require("../../controllers/frontend/passesController");

router.get(
	"",
	passesController.getAllPasses
);

router.post(
	"",
	passesController.postNewPass
);

module.exports = router;
