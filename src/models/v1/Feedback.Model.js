const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name:{
    
      type: String,
      required: true, // Name is essential for identifying
    
  },
  profile:{
    
      type: String,
      default: "", // Feedback content can be empty if the user doesn't provide a comment
      require:true
    
  },
  phone: {
    type: String,
    required: true, // Phone is essential for identifying users
  },
  rating: {
    type: Number, // Assuming it's a single rating (e.g., 1-5 stars)
    min: 0,
    max: 5,
    required: true, // The rating is mandatory
  },
  isApproved:{
    type:Boolean,
    default:false,
    require:true
  },
  content: {
    type: String,
    default: "", // Feedback content can be empty if the user doesn't provide a comment
  },
}, { timestamps: true }); // Automatically manages createdAt and updatedAt fields

module.exports = mongoose.model("Feedback", feedbackSchema);
