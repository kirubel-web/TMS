const Vehicle = require("../models/Vehicle");

exports.createVehicle = async (req, res) => {
  try {
    const { name, type, licensePlate, manufacturer, model, year, status } =
      req.body;

    // Create a new vehicle with the provided data
    const newVehicle = new Vehicle({
      name,
      type,
      licensePlate,
      manufacturer,
      model,
      year,
      status,
    });
    console.log(newVehicle);
    // Save the vehicle to the database
    const savedVehicle = await newVehicle.save();

    res.status(201).json({
      message: "Vehicle created successfully",
      vehicle: savedVehicle,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the vehicle by ID
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json({ vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, licensePlate, manufacturer, model, year, status } =
      req.body;

    // Update the vehicle with the provided data
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { name, type, licensePlate, manufacturer, model, year, status },
      { new: true },
    );

    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the vehicle by ID
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json({
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    // Retrieve all vehicles from the database
    const vehicles = await Vehicle.find();

    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
