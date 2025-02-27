const {
  registerController,
  loginController,
  logoutController,
} = require("../../controllers/v1/auth.controller");
const checkAuth = require("../../middlewares/v1/Auth");

const router = require("express").Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout",checkAuth, logoutController);

module.exports = router;
