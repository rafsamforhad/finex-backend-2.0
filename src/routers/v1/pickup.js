const {
  allUserPickupController,
  singlePickupController,
  createPickupController,
  updatePickupController,
  deletePickupController,
  requestAcceptedByStaffController,
} = require("../../controllers/v1/pickup.controller");
const checkAuth = require("../../middlewares/v1/Auth");
const router = require("express").Router();

router.get("/", allUserPickupController);
router.get("/:id",checkAuth, singlePickupController);
router.post("/:phone",checkAuth, createPickupController);
router.put("/:id", checkAuth,updatePickupController);
router.delete("/:id",checkAuth, deletePickupController);
router.post("/accepted",checkAuth, requestAcceptedByStaffController);

module.exports = router;
