const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: "",
  },
  phone: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  message: {
    type: String,
    required: false,
    default: "",
  },
  status: {
    type: String,
    required: true,
    default: "requested",
  },
  message2: {
    type: String,
    required: true,
    default: "N/A",
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);
