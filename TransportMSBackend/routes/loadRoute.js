// routes/loadRoute.js
const express = require("express");
const router = express.Router();
//const auth = require("../middleware/auth");
const {
  createLoad,
  getAllLoads,
  getLoadById,
  updateLoad,
  deleteLoad,
  updateLoadStatus,
  getLoadsByCustomer,
  getLoadsByDriver,
  getLoadsByVehicle,
} = require("../controllers/loadController");

// Base route: /api/loads

// Create new load
router.post("/create", createLoad);

// Get all loads
router.get("/", getAllLoads);

// Get specific load
router.get("/:id", getLoadById);

// Update load
router.put("/:id", updateLoad);

// Delete load
router.delete("/:id", deleteLoad);

// Update load status
router.patch("/:id/status", updateLoadStatus);

// Get loads by customer
router.get("/customer/:customerId", getLoadsByCustomer);

// Get loads by driver
router.get("/driver/:driverId", getLoadsByDriver);

// Get loads by vehicle
router.get("/vehicle/:vehicleId", getLoadsByVehicle);

module.exports = router;
