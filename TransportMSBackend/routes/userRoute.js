const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
