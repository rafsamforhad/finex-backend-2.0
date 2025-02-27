const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customarPhone: {
    type: String,
    required: true,
  },
  creatorPhone: {
    type: String,
    required: true,
  },
  parcel: {
    type: Object,
    required: true,
    from: {
      type: Object,
      required: false,
      default: {
        country: "",
        id: "",
      },
    },
    to: {
      type: Object,
      required: false,
      default: {
        country: "",
        id: "",
      },
    },
    sender: {
      name: {
        type: String,
        required: false,
      },
      phone: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
      zipCode: {
        type: String,
        required: false,
      },
    },
    reciver: {
      name: {
        type: String,
        required: false,
      },
      phone: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      address: {
        type: Object,
        required: false,
        city: {
          type: String,
          required: false,
        },
        country: {
          type: String,
          required: false,
        },
        zipCode: {
          type: String,
          required: false,
        },
        address: {
          type: String,
          required: false,
        },
      },
    },
    weight: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: false,
    },
    item: {
      type: Object,
      required: false,
      types: {
        type: String,
        required: false,
      },
      list: {
        type: Array,
        required: false,
      },
    },
  },
  orderDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  box:{ type: Array, default: [] },
  payment: {
    type: Object,
    required: true,
    pType: {
      type: String,
      required: true,
      default: "",
    },
    pAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    pOfferDiscount:{
      type: Number,
      required: true,
      default: 0,
    },
    pExtraCharge: {
      type: Number,
      required: true,
      default: 0,
    },
    pDiscount: {
      type: Number,
      required: true,
      default: 0,
    },
    pRecived: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  trackId: {
    type: String,
    required: true,
  },
  handover_by: {
    type: Object,
    required: true,
    default: {
      company: "",
      traking: "",
      payment: 0,
    },
  },
});


module.exports = mongoose.model("Order", orderSchema);
