const {
  allTrackService,
  singleTrackService,
  createTrackService,
  deleteTrackService,
} = require("../../services/v1/track.service");

const allTrackController = (req, res) => {
  try {
    allTrackService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleTrackController = (req, res) => {
  try {
    singleTrackService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const createTrackController = (req, res) => {
  try {
    createTrackService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteTrackController = (req, res) => {
  try {
    deleteTrackService(req, res);
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  allTrackController,
  singleTrackController,
  createTrackController,
  deleteTrackController,
};
