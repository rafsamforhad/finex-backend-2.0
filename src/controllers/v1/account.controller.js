const {
  allUserService,
  singleUserService,
  userImageUploadService,
  updateUserDataService,
  deleteUserService,
  verifyEmailSendService,
  confirmEmailVerifyService,
  resetPasswordEmailSendService,
  confirmResetPasswordService,
  allUserAddressService,
  singleUserAddressService,
  updateUserAddressService,
  deleteUserAddressService,
  allUserOfferService,
  singleUserOfferService,
  updateUserOfferService,
  deleteUserOfferService,
  allUserReferenceService,
  singleUserReferenceService,
  updateUserReferenceService,
  deleteUserReferenceService,
} = require("../../services/v1/account.service");

const allUserController = (req, res) => {
  try {
    allUserService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleUserController = (req, res) => {
  try {
    singleUserService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const userImageUploadController = (req, res) => {
  try {
    userImageUploadService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updateUserDataController = (req, res) => {
  try {
    updateUserDataService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteUserController = (req, res) => {
  try {
    deleteUserService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const verifyEmailSendController = (req, res) => {
  try {
    verifyEmailSendService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const confirmEmailVerifyController = (req, res) => {
  try {
    confirmEmailVerifyService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const resetPasswordEmailSendController = (req, res) => {
  try {
    resetPasswordEmailSendService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const confirmResetPasswordController = (req, res) => {
  try {
    confirmResetPasswordService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const allUserAddressController = (req, res) => {
  try {
    allUserAddressService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleUserAddressController = (req, res) => {
  try {
    singleUserAddressService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updateUserAddressController = (req, res) => {
  try {
    updateUserAddressService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteUserAddressController = (req, res) => {
  try {
    deleteUserAddressService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const allUserOfferController = (req, res) => {
  try {
    allUserOfferService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleUserOfferController = (req, res) => {
  try {
    singleUserOfferService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updateUserOfferController = (req, res) => {
  try {
    updateUserOfferService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteUserOfferController = (req, res) => {
  try {
    deleteUserOfferService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

const allUserReferenceController = (req, res) => {
  try {
    allUserReferenceService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const singleUserReferenceController = (req, res) => {
  try {
    singleUserReferenceService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const updateUserReferenceController = (req, res) => {
  try {
    updateUserReferenceService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};
const deleteUserReferenceController = (req, res) => {
  try {
    deleteUserReferenceService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Controller",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  allUserController,
  singleUserController,
  userImageUploadController,
  updateUserDataController,
  deleteUserController,
  verifyEmailSendController,
  confirmEmailVerifyController,
  resetPasswordEmailSendController,
  confirmResetPasswordController,
  allUserAddressController,
  singleUserAddressController,
  updateUserAddressController,
  deleteUserAddressController,
  allUserOfferController,
  singleUserOfferController,
  updateUserOfferController,
  deleteUserOfferController,
  allUserReferenceController,
  singleUserReferenceController,
  updateUserReferenceController,
  deleteUserReferenceController,
};
