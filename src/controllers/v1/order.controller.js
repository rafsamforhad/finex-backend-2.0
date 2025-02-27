const {
  allOrderService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
  userTotalOrderService,
  singleOrderService,
  paymentOrderService,
} = require("../../services/v1/order.service");

const allOrderController = (req, res) => {
  try {
    allOrderService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleOrderController = (req, res) => {
  try {
    singleOrderService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const createOrderController = (req, res) => {
  try {
    createOrderService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updateOrderController = (req, res) => {
  try {
    updateOrderService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteOrderController = (req, res) => {
  try {
    deleteOrderService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const paymentOrderController = (req, res) => {
  try {
    paymentOrderService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const userTotalOrderController = (req, res) => {
  try {
    userTotalOrderService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  allOrderController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
  userTotalOrderController,
  singleOrderController,
  paymentOrderController,
};
