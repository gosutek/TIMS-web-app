const express = require('express');
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/healthcheck", adminController.checkDatabaseConnection);

router.post("/resetdatabase", adminController.resetDatabase);

module.exports = router;