const  router = require("express").Router();
const authRouter = require("./v1/auth.js")
const accountRouter = require("./v1/account.js")
const utilsRouter = require("./v1/utils.js")
const pickupRouter = require("./v1/pickup.js")
const priceRouter = require("./v1/price.js")
const orderRouter = require("./v1/order.js")
const trackRouter = require("./v1/track.js")
const blogRouter = require("./v1/blog.js")

router.use("/auth",authRouter)
router.use("/account",accountRouter)
router.use("/blog",blogRouter)
router.use("/order",orderRouter)
router.use("/pickup",pickupRouter)
router.use("/price",priceRouter)
router.use("/track",trackRouter)
router.use("/utils",utilsRouter)



module.exports = router;
