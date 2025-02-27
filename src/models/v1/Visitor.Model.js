const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    message:{
      type: String,
      required: false,
      default: 'N/A',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
