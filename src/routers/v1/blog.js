const {
  postBlogController,
  allBlogController,
  singleBlogController,
  putBlogController,
  deleteBlogController,
} = require("../../controllers/v1/blog.controller");

const router = require("express").Router();

router.get("/",allBlogController);
router.get("/:id",singleBlogController);
router.post("/",postBlogController);
router.put("/:id",putBlogController);
router.delete("/:id",deleteBlogController);

module.exports = router;
