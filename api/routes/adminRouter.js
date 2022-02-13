const express = require('express');
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/healthcheck", adminController.checkDatabaseConnection);

router.post("/pgenerated", adminController.addGeneratedData);

router.post("/resetpasses", adminController.resetPasses);

router.post("/resetstations", adminController.resetStations);

router.post("/resetvehicles", adminController.resetVehicles);

router.post("/emptydatabase", adminController.emptyDatabase);

module.exports = router;