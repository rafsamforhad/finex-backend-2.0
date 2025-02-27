const router = require("express").Router();

const {
  allTrackController,
  singleTrackController,
  createTrackController,
  deleteTrackController,
} = require("../../controllers/v1/track.controller");
const checkAuth = require("../../middlewares/v1/Auth");

router.get("/", allTrackController);
router.get("/:trackID", singleTrackController);
router.post("/add/:trackID",checkAuth, createTrackController);
router.delete("/:trackID",checkAuth, deleteTrackController);

module.exports = router;
