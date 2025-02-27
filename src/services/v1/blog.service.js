const BlogModel = require("../../models/v1/Blog.Model");

const allBlogService = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    return res.status(200).json({
      message: "All blogs found",
      status: 200,
      data: blogs,
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const singleBlogService = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(200).json({
        message: "Blog not found",
        status: 404,
        data: {},
      });
    }
    return res.status(200).json({
      message: "Blog found",
      status: 200,
      data: blog,
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const postBlogService = async (req, res) => {
  try {
    const { author, blog,title,titleBn } = req.body;
    const newBlog = new BlogModel({
      author: author,
      blog: blog,
      title:title,
      titleBn:titleBn
    });
    const savedBlog = await newBlog.save();
    return res.status(200).json({
      message: "Blog created successfully",
      status: 200,
      data: savedBlog,
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const putBlogService = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, blog,title,titleBn } = req.body;
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, {
      author: author,
      blog: blog,
      title:title,
      titleBn:titleBn
    });
    return res.status(200).json({
      message: "Blog updated successfully",
      status: 200,
      data: updatedBlog,
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const deleteBlogService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(200).json({
        message: "Blog not found",
        status: 404,
        data: [],
      });
    }
    return res.status(200).json({
      message: "Blog deleted successfully",
      status: 200,
      data: [],
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  allBlogService,
  singleBlogService,
  postBlogService,
  putBlogService,
  deleteBlogService,
};
