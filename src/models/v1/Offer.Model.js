const mongoose = require("mongoose");

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const offerSchema = new mongoose.Schema({
  phone: {
    type: String,
    require: true,
  },
  offer: {
    type: Object,
    require: true,
    default: {
      type: "BASIC",
      startDate: new Date().toLocaleDateString(),
      lastDate: null,
    },
  },
  discount: {
    type: Number,
    require: true,
    default: 0,
  },
  monthInTotalShipment: {
    type: Array,
    require: true,
    default: [
      {
        month: monthNames[new Date().getMonth()],
        totalShipment :0,
        totalPayment:0
      }
    ],
  },
});

module.exports = mongoose.model("Offer", offerSchema);
