const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const customerController = require("../controllers/customerConstroller");

router.post("/create", customerController.createCustomer);
router.get("/count", customerController.getCustomersCount);
router.get("/:id", customerController.getCustomer);
router.get("/", customerController.getAllCustomers);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
