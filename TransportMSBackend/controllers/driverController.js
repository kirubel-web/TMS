const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");

exports.createDriver = async (req, res) => {
  try {
    const {
      name,
      type,
      hireDate,
      phones,
      email,
      truck,
      trailer,
      docs,
      status,
      actions,
    } = req.body;

    const driver = new Driver({
      name,
      type,
      hireDate,
      phones,
      email,
      truck,
      trailer,
      docs,
      status,
      actions,
    });

    await driver.save();

    res.status(201).json({
      message: "Driver created successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findById(id)
      .populate("truck")
      .populate("trailer");

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.status(200).json({ driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      hireDate,
      phones,
      email,
      truck,
      trailer,
      docs,
      status,
      actions,
    } = req.body;

    const driver = await Driver.findByIdAndUpdate(
      id,
      {
        name,
        type,
        hireDate,
        phones,
        email,
        truck,
        trailer,
        docs,
        status,
        actions,
      },
      { new: true },
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.status(200).json({
      message: "Driver updated successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await Driver.findByIdAndDelete(id);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.status(200).json({
      message: "Driver deleted successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate("truck").populate("trailer");

    res.status(200).json({ drivers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateDriverStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    driver.status = status;
    await driver.save();

    res.status(200).json({
      message: "Driver status updated successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};