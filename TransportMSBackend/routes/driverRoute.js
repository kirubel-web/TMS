const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");
const driverController = require("../controllers/driverController");

router.post("/create", driverController.createDriver);
router.get("/:id", driverController.getDriver);
router.get("/", driverController.getAllDrivers);
router.put("/:id", driverController.updateDriver);
router.delete("/:id", driverController.deleteDriver);

module.exports = router;
