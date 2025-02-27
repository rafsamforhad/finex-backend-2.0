const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
  phone: {
    type: String,
    require: true,
  },
  codeUsedByUser: {
    type: Array,
    default: [],
    require: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Reference", referenceSchema);
