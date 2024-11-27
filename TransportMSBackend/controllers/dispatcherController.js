const Dispatcher = require("../models/Dispatcher");

exports.createDispatcher = async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;

    const dispatcher = new Dispatcher({
      firstName,
      lastName,
      email,
      role,
    });
    console.log("Request Body:", req.body);

    await dispatcher.save();

    res.status(201).json({
      message: "Dispatcher created successfully",
      dispatcher,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDispatcher = async (req, res) => {
  try {
    const { id } = req.params;
    const dispatcher = await Dispatcher.findById(id);

    if (!dispatcher) {
      return res.status(404).json({ error: "Dispatcher not found" });
    }

    res.status(200).json({ dispatcher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDispatcher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const dispatcher = await Dispatcher.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true },
    );

    if (!dispatcher) {
      return res.status(404).json({ error: "Dispatcher not found" });
    }

    res.status(200).json({
      message: "Dispatcher updated successfully",
      dispatcher,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDispatcher = async (req, res) => {
  try {
    const { id } = req.params;
    const dispatcher = await Dispatcher.findByIdAndDelete(id);

    if (!dispatcher) {
      return res.status(404).json({ error: "Dispatcher not found" });
    }
    res.status(200).json({
      message: "Dispatcher deleted successfully",
      dispatcher,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all dispatchers
exports.getAllDispatchers = async (req, res) => {
  try {
    const dispatchers = await Dispatcher.find();
    res.status(200).json(dispatchers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dispatchers", error });
  }
};

exports.getDispatchersCount = async (req, res) => {
  try {
    const count = await Dispatcher.find().countDocuments();
    return res.status(200).json({
      success: true,
      count: count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error counting dispatchers",
    });
  }
};

exports.getDispatchersByRole = async (req, res) => {
  try {
    const roleStats = await Dispatcher.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      roleStats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error getting dispatcher role statistics",
    });
  }
};
