// controllers/loadController.js
const Load = require("../models/Load");

// Create new load
exports.createLoad = async (req, res) => {
  try {
    const {
      customer,
      driver,
      vehicle,
      pickup,
      delivery,
      price,
      weight,
      description,
      specialInstructions,
    } = req.body;

    const loadNumber = "LOAD-" + Date.now();

    const load = new Load({
      loadNumber,
      customer,
      driver,
      vehicle,
      pickup,
      delivery,
      price,
      weight,
      description,
      specialInstructions,
    });

    await load.save();

    const populatedLoad = await Load.findById(load._id)
      .populate("customer", "firstName lastName company")
      .populate("driver", "name")
      .populate("vehicle", "manufacturer model licensePlate");

    res.status(201).json({
      success: true,
      load: populatedLoad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all loads
exports.getAllLoads = async (req, res) => {
  try {
    const loads = await Load.find()
      .populate("customer", "firstName lastName company")
      .populate("driver", "name")
      .populate("vehicle", "manufacturer model")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      loads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get load by ID
exports.getLoadById = async (req, res) => {
  try {
    const load = await Load.findById(req.params.id)
      .populate("customer", "firstName lastName company")
      .populate("driver", "name")
      .populate("vehicle", "manufacturer model licensePlate");

    if (!load) {
      return res.status(404).json({
        success: false,
        error: "Load not found",
      });
    }

    res.status(200).json({
      success: true,
      load,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update load
exports.updateLoad = async (req, res) => {
  try {
    const load = await Load.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("customer driver vehicle");

    if (!load) {
      return res.status(404).json({
        success: false,
        error: "Load not found",
      });
    }

    res.status(200).json({
      success: true,
      load,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete load
exports.deleteLoad = async (req, res) => {
  try {
    const load = await Load.findByIdAndDelete(req.params.id);

    if (!load) {
      return res.status(404).json({
        success: false,
        error: "Load not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Load deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update load status
exports.updateLoadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const load = await Load.findByIdAndUpdate(
      req.params.id,
      {
        status,
        updatedAt: Date.now(),
      },
      {
        new: true,
      },
    ).populate("customer driver vehicle");

    if (!load) {
      return res.status(404).json({
        success: false,
        error: "Load not found",
      });
    }

    res.status(200).json({
      success: true,
      load,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get loads by customer
exports.getLoadsByCustomer = async (req, res) => {
  try {
    const loads = await Load.find({ customer: req.params.customerId })
      .populate("customer", "firstName lastName company")
      .populate("driver", "name")
      .populate("vehicle", "manufacturer model licensePlate")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      loads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get loads by driver
exports.getLoadsByDriver = async (req, res) => {
  try {
    const loads = await Load.find({ driver: req.params.driverId })
      .populate("customer", "firstName lastName company")
      .populate("driver", "name")
      .populate("vehicle", "manufacturer model licensePlate")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      loads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get loads by vehicle
exports.getLoadsByVehicle = async (req, res) => {
  try {
    const loads = await Load.find({ vehicle: req.params.vehicleId })
      .populate("customer", "firstName lastName company")
      .populate("driver", "name")
      .populate("vehicle", "manufacturer model licensePlate")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      loads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
