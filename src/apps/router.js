const router = require("express").Router();
const ApiKey = require("../middlewares/v1/ApiKey.js");
const v1 = require("../routers/v1.js");


router.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Successfull", status: 200, data: "Successfull" });
});


router.get("/health", (_req, res) => {
  res
    .status(200)
    .json({ message: "Successfull", status: 200, data: "Successfull" });
});

router.use("/api/v1/",ApiKey, v1);

module.exports = router;
