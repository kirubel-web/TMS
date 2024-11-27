const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["full-time", "part-time", "contractor"],
    required: true,
  },
  hireDate: {
    type: Date,
  },
  phones: [
    {
      type: String,
      required: true,
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  truck: {
    type: String,
  },
  trailer: {
    type: String,
    required: true, // Specify the trailer ID or number associated with the driver
  },
  docs: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive", "on-duty", "off-duty"], // Driver status
    default: "active", // Default status is 'active'
  },
  actions: [
    {
      type: String,
      enum: ["assigned", "completed", "on-break", "delayed"], // Actions could refer to the driver's work status or activity
    },
  ],
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
