const mongoose = require("mongoose");

const dispatcherSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },

  email: {
    required: true,
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["Dispatcher", "Manager"],
    default: "Dispatcher",
    required: true,
  },
});

const Dispatcher = mongoose.model("Dispatcher", dispatcherSchema);

module.exports = Dispatcher;
