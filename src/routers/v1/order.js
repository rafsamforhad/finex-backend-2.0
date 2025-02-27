const {
  allOrderController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
  userTotalOrderController,
  singleOrderController,
  paymentOrderController,
} = require("../../controllers/v1/order.controller");
const adminCheck = require("../../middlewares/v1/Admin");
const checkAuth = require("../../middlewares/v1/Auth");

const router = require("express").Router();

router.get("/", allOrderController);
router.get("/:trackID",checkAuth, singleOrderController);
router.post("/", checkAuth,createOrderController);
router.put("/:trackID",checkAuth, updateOrderController);
router.delete("/:trackID", adminCheck,deleteOrderController);

router.post("/payment/:trackID",checkAuth, paymentOrderController);

router.get("/user/:phone",checkAuth, userTotalOrderController);


router.post("/add")

module.exports = router;
