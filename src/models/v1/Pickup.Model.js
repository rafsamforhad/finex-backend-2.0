const mongoose = require("mongoose")

const pickupSchema = new mongoose.Schema({
    phone:{
        type:String,
        required: true,
    },
    profile:{
        type:String,
        required: false,
        default:"",
    },
    name:{
        type:String,
        required: true,
        default:"",
    },
    parcel: {
        type: Object,
        required: true,
        weight: {
            type: String,
            required: false,
            default: "no idea",
        },
        item:{
            type: String,
            required: false,
            default: "no idea",
        },
    },
    address: {
        type: Object,
        required: true,
        region:{

            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    pickupTime: {
        type: Date,
        required: true,
            default: new Date(),
        
    },
    isAccepted: {
        type: Object,
        required: false,
        phone: {
            type: String,
            required: false,
            default: "",
        },
        status: {
            type: String,
            required: false,
            default: "Created",
        },
        confirm: {
            type: Boolean,
            required: false,
            default: false,
        },
        staffCost:{
            type: Number,
            required: false,
            default: 0,
        }
    },
});

module.exports = mongoose.model("Pickup", pickupSchema);