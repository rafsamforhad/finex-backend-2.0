const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  tracking_number: { type: String, default: "" },
  own_tracking_info: {
    weight: { type: String, default: "" },
    weight_kg: { type: String, default: "" },
    item: { type: String, default: "" },
    list: { type: Array, default: [] },
    box: { type: Array, default: [] },
    courier_tracking: {
      defualt: [],
      require: false,
      type: Array,
    },

    tracking_info: {
      type: Array,
      default: [
        {
          checkpoint_date: new Date(),
          checkpoint_delivery_status: "pickup_bd",
          checkpoint_delivery_substatus: "pickup_bd",
          tracking_detail: "The parcel has been collected from the customer",

          location: "DHAKA",
          country_iso2: "",
          state: "DHAKA",
          city: "DHAKA",
          zip: "1230",
          raw_status: "",
        },
        {
          checkpoint_date: new Date(),
          checkpoint_delivery_status: "pickup_bd",
          checkpoint_delivery_substatus: "pickup_bd",
          tracking_detail: "This shipment is now ready to go to the airport",

          location: "DHAKA",
          country_iso2: "",
          state: "DHAKA",
          city: "DHAKA",
          zip: "1230",
          raw_status: "",
        },
      ],
    },
  },
});

module.exports = mongoose.model("Track", trackSchema);
