const {
  registerService,
  loginService,
  logoutService,
} = require("../../services/v1/auth.service");

const registerController = (req, res) => {
  try {
    registerService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in registerController",
      status: 500,
      error: error.message,
    });
  }
};

const loginController = (req, res) => {
  try {
    loginService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in loginController",
      status: 500,
      error: error.message,
    });
  }
};

const logoutController = (req, res) => {
  try {
    logoutService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in logoutController",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
