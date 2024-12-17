const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, admin } = require("../middleware/auth");

// Move profile routes BEFORE the /:id routes
router.get("/profile", auth, admin, userController.getProfile);
router.put("/profile", auth, admin, userController.updateProfile);

router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
