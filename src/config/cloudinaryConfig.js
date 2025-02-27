const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinaryConfig =()=> cloudinary.v2.config({
  cloud_name: "dw6gu0tzu",
  api_key: "241176846243258",
  api_secret: "TDqfP5GeVUUbRdB5pl12vhBuf3U",
})



module.exports = {
  cloudinaryConfig,
};
