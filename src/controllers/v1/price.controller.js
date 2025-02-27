const {
  priceQuoteService,
  allPriceListService,
  singlePriceListService,
  createPriceListService,
  updatePriceListService,
  deletePriceListService,
} = require("../../services/v1/price.service");

const priceQuoteController = (req, res) => {
  try {
    priceQuoteService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const allPriceListController = (req, res) => {
  try {
    allPriceListService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singlePriceListController = (req, res) => {
  try {
    singlePriceListService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const createPriceListController = (req, res) => {
  try {
    createPriceListService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updatePriceListController = (req, res) => {
  try {
    updatePriceListService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deletePriceListController = (req, res) => {
  try {
    deletePriceListService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  priceQuoteController,
  allPriceListController,
  singlePriceListController,
  createPriceListController,
  updatePriceListController,
  deletePriceListController,
};
