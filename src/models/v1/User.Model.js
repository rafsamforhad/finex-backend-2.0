const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "B2C",
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    nationalID: {
      type: Object,
      required: false,
      default: {
        front: "",
        back: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
