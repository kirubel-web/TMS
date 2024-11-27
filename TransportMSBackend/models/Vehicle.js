const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["truck", "trailer", "car"],
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(), // Ensure the year is valid
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
