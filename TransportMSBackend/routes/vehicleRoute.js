const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const vehicleController = require("../controllers/vehicleController");

router.post("/create", vehicleController.createVehicle);
router.get("/:id", vehicleController.getVehicle);
router.get("/", vehicleController.getAllVehicles);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);
router.patch("/:id/status", vehicleController.updateVehicleStatus); // New route for status update

module.exports = router;
