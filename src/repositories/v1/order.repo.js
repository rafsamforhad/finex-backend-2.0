const OrderModel = require("../../models/v1/Order.Model");

const createOrder = async  (
    customarPhone,
    creatorPhone,
    parcel,
    orderDate,payment,box,
    trackId
  ) => {
    const newOrder = new OrderModel({
      customarPhone: customarPhone,
      creatorPhone: creatorPhone,
      parcel,
      orderDate,payment,
      trackId,
      box
    });
  
    const createNewOrder = await newOrder.save();
  
    return createNewOrder;
  };


  module.exports = {
    createOrder
  }
