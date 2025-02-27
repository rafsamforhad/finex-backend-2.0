const {
  allBlogService,
  singleBlogService,
  postBlogService,
  putBlogService,
  deleteBlogService,
} = require("../../services/v1/blog.service");

const allBlogController = async (req, res) => {
    try {
        allBlogService(req, res);
    } catch (error) {
        res.status(200).json({
        message: "Internal server error in Service",
        status: 500,
        error: error.message,
        });
    }
};
const singleBlogController = async (req, res) => {
    try {
        singleBlogService(req, res);
    } catch (error) {
        res.status(200).json({
        message: "Internal server error in Service",
        status: 500,
        error: error.message,
        });
    }
};
const postBlogController = async (req, res) => {
  try {
    postBlogService(req, res);
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const putBlogController = async (req, res) => {
    try {
        putBlogService(req, res);
    } catch (error) {
        res.status(200).json({
        message: "Internal server error in Service",
        status: 500,
        error: error.message,
        });
    }
};
const deleteBlogController = async (req, res) => {
    try {
        deleteBlogService(req, res);
    } catch (error) {
        res.status(200).json({
        message: "Internal server error in Service",
        status: 500,
        error: error.message,
        });
    }
};

module.exports = {
  allBlogController,
  singleBlogController,
  postBlogController,
  putBlogController,
  deleteBlogController,
};
