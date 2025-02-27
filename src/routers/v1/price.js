const {
  priceQuoteController,
  allPriceListController,
  singlePriceListController,
  createPriceListController,
  updatePriceListController,
  deletePriceListController,
} = require("../../controllers/v1/price.controller");

const router = require("express").Router();

// public getway
router.get("/:from/:to", priceQuoteController);

// admin getway
router.get("/", allPriceListController);
router.get("/:id", singlePriceListController);
router.post("/", createPriceListController);
router.put("/:id", updatePriceListController);
router.delete("/:id", deletePriceListController);

module.exports = router;
