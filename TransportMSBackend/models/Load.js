const mongoose = require("mongoose");

const loadSchema = new mongoose.Schema({
  loadNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  pickup: {
    latitude: String,
    longitude: String,
    date: Date,
    time: String,
  },
  delivery: {
    latitude: String,
    longitude: String,
    date: Date,
    time: String,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "cancelled"],
    default: "pending",
  },
  price: {
    type: Number,
    required: true,
  },
  weight: Number,
  description: String,
  specialInstructions: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

module.exports = mongoose.model("Load", loadSchema);
