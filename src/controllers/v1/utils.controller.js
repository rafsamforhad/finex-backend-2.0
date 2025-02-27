const {
  allCountryService,
  createCountryService,
  singleCountryService,
  updateCountryService,
  deleteCountryService,
  allFeedbackService,
  createFeedbackService,
  singleFeedbackService,
  updateFeedbackService,
  deleteFeedbackService,
  allContactService,
  createContactService,
  singleContactService,
  updateContactService,
  deleteContactService,
  allVisitorService,
  createVisitorService,
  singleVisitorService,
  updateVisitorService,
  deleteVisitorService,
} = require("../../services/v1/utils.service");

const allCountryController = (req, res) => {
  try {
    allCountryService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const createCountryController = (req, res) => {
  try {
    createCountryService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleCountryController = (req, res) => {
  try {
    singleCountryService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updateCountryController = (req, res) => {
  try {
    updateCountryService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteCountryController = (req, res) => {
  try {
    deleteCountryService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const allFeedbackController = (req, res) => {
  try {
    allFeedbackService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const createFeedbackController = (req, res) => {
  try {
    createFeedbackService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleFeedbackController = (req, res) => {
  try {
    singleFeedbackService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updateFeedbackController = (req, res) => {
  try {
    updateFeedbackService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteFeedbackController = (req, res) => {
  try {
    deleteFeedbackService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const allContactController = (req, res) => {
  try {
    allContactService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const createContactController = (req, res) => {
  try {
    createContactService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleContactController = (req, res) => {
  try {
    singleContactService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updateContactController = (req, res) => {
  try {
    updateContactService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteContactController = (req, res) => {
  try {
    deleteContactService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const allVisitorController = (req, res) => {
  try {
    allVisitorService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const createVisitorController = (req, res) => {
  try {
    createVisitorService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleVisitorController = (req, res) => {
  try {
    singleVisitorService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updateVisitorController = (req, res) => {
  try {
    updateVisitorService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteVisitorController = (req, res) => {
  try {
    deleteVisitorService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  allCountryController,
  createCountryController,
  singleCountryController,
  updateCountryController,
  deleteCountryController,
  allFeedbackController,
  createFeedbackController,
  singleFeedbackController,
  updateFeedbackController,
  deleteFeedbackController,
  allContactController,
  createContactController,
  singleContactController,
  updateContactController,
  deleteContactController,
  allVisitorController,
  createVisitorController,
  singleVisitorController,
  updateVisitorController,
  deleteVisitorController,
};
