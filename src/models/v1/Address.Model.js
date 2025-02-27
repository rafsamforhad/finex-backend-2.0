const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  phone: {
    type: String,
    require: true,
  },
  region: {
    type: String,
    require: false,
    default: "",
  },
  city: {
    type: String,
    require: false,
    default: "",
  },
  area: {
    type: String,
    require: false,
    default: "",
  },
  address:{

    type: String,
    require: false,
    default: "",
  }
});

module.exports = mongoose.model("Address", addressSchema);
