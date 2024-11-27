const Customer = require("../models/Customer");

exports.createCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      company,
      phones,
      address,
      city,
      country,
      rating,
      notes,
    } = req.body;

    const customer = new Customer({
      firstName,
      phones,
      lastName,
      email,
      company,
      address,
      city,
      country,
      rating,
      notes,
    });
    console.log("Request Body:", req.body);

    await customer.save();

    res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true },
    );

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomersCount = async (req, res) => {
  try {
    const count = await Customer.find().countDocuments();
    console.log("Count:", count); // Add this for debugging
    return res.status(200).json({
      success: true,
      count: count,
    });
  } catch (error) {
    console.error("Count error:", error); // Add this for debugging
    return res.status(500).json({
      success: false,
      error: "Error counting customers",
    });
  }
};
