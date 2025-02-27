const {
  allUserPickupService,
  singlePickupService,
  createPickupService,
  updatePickupService,
  deletePickupService,
  requestAcceptedByStaffService,
} = require("../../services/v1/pickup.service");

const allUserPickupController = (req, res) => {
  try {
    allUserPickupService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const singlePickupController = (req, res) => {
  try {
    singlePickupService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const createPickupController = (req, res) => {
  try {
    createPickupService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const updatePickupController = (req, res) => {
  try {
    updatePickupService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const deletePickupController = (req, res) => {
  try {
    deletePickupService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};



const requestAcceptedByStaffController = (req, res) => {
    try {
        requestAcceptedByStaffService(req, res);
    } catch (error) {
      res.status(200).json({
        message: "Internal server error in Controller",
        status: 500,
        error: error.message,
      });
    }
  };

module.exports = {
  allUserPickupController,
  singlePickupController,
  createPickupController,
  updatePickupController,
  deletePickupController,requestAcceptedByStaffController
};
