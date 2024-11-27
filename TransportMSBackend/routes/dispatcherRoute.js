const express = require("express");
const router = express.Router();
const dispatcherController = require("../controllers/dispatcherController");

router.get("/count", dispatcherController.getDispatchersCount);
router.get("/roles", dispatcherController.getDispatchersByRole);
router.post("/create", dispatcherController.createDispatcher);
router.get("/", dispatcherController.getAllDispatchers);
router.get("/:id", dispatcherController.getDispatcher);
router.put("/:id", dispatcherController.updateDispatcher);
router.delete("/:id", dispatcherController.deleteDispatcher);

module.exports = router;
