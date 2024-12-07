const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  email: {
    type: String,

    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  company: {
    type: String,
    trim: true,
  },
  phones: {
    type: [String],
  },

  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },

  country: {
    type: String,
    trim: true,
  },
  rating: {
    type: String,
    enum: ["5", "4", "3", "2", "1"],
  },

  notes: {
    type: String,
    trim: true,
  },
  logo: {
    type: String, // URL to the logo image
  },
  deleted: {
    type: Boolean,
    default: false, // Set to true if the user deletes their account
  },
  department: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
