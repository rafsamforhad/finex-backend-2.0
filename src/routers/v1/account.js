const uploadMiddleware = require("../../config/cloudinaryConfig.js");
const {
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
} = require("../../controllers/v1/account.controller.js");
const adminCheck = require("../../middlewares/v1/Admin.js");
const checkAuth = require("../../middlewares/v1/Auth.js");

const router = require("express").Router();

router.get("/",adminCheck, allUserController);
router.get("/:phone",checkAuth, singleUserController);
router.put("/:phone",checkAuth, userImageUploadController);
router.post("/:phone",checkAuth, updateUserDataController);
router.delete("/:phone",checkAuth, deleteUserController);

router.post("/email-verify/:token", verifyEmailSendController);
router.post("/email-verify/confirm/:token", confirmEmailVerifyController);

router.post("/reset-password/:token", resetPasswordEmailSendController);
router.post("/reset-password/confirm/:token", confirmResetPasswordController);

router.get("/address/all",adminCheck, allUserAddressController);
router.get("/address/:phone",adminCheck, singleUserAddressController);
router.get("/offer/all",adminCheck, allUserOfferController);


router.get("/offer/:phone",checkAuth, singleUserOfferController);
router.get("/reference/all", allUserReferenceController);
router.get("/reference/:phone",checkAuth, singleUserReferenceController);

router.put("/address/:phone",checkAuth, updateUserAddressController);
router.put("/offer/:phone",checkAuth, updateUserOfferController);
router.put("/reference/:phone",checkAuth, updateUserReferenceController);

router.delete("/address/:phone",checkAuth, deleteUserAddressController);
router.delete("/offer/:phone",checkAuth, deleteUserOfferController);
router.delete("/reference/:phone",checkAuth, deleteUserReferenceController);

module.exports = router;
