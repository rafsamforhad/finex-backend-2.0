const UserModel = require("../../models/v1/User.Model");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {
  userTokenIdFindByToken,
  createToken,
  deleteAddress,
  deleteOffer,
  deleteRefCode,
} = require("../../repositories/v1/user.repo");

const nodemailer = require("nodemailer");
const TokenModel = require("../../models/v1/Token.Model");
const { convertHash } = require("../../utils/hash");

const AddressModel = require("../../models/v1/Address.Model");
const OfferModel = require("../../models/v1/Offer.Model");
const ReferenceModel = require("../../models/v1/Reference.Model");

const mailConfig = require("../../config/mailConfig");
const { cloudinaryConfig } = require("../../config/cloudinaryConfig");

cloudinaryConfig();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2, // Use the cloudinary instance
  params: async (req, file) => {
    let folderName = "user_profiles"; // Default folder name for storing user profiles
    let publicId;

    // Set the publicId and folderName based on the fieldname of the uploaded file
    if (file.fieldname === "profile") {
      publicId = `profile_${req.params.phone}`;
    } else if (file.fieldname === "nationalID.front") {
      folderName = "national_ids";
      publicId = `nationalID_front_${req.params.phone}`;
    } else if (file.fieldname === "nationalID.back") {
      folderName = "national_ids";
      publicId = `nationalID_back_${req.params.phone}`;
    }

    return {
      folder: folderName, // Folder to store the image in Cloudinary
      format: "jpg", // Format for the stored image
      public_id: publicId, // Unique identifier for the image
      allowed_formats: ["jpg", "jpeg", "png"], // Allowed file formats
    };
  },
});
// Initialize the multer middleware with Cloudinary storage
const upload = multer({ storage: storage });

const allUserService = async (req, res) => {
  try {
    const allUserSearchByDb = await UserModel.find().select(
      "_id name phone email role profile status nationalID"
    );
    if (req?.query?.start && req?.query?.end) {
      const FilterByQuery = allUserSearchByDb.filter((item, index) => {
        if (index + 1 >= req?.query?.start && index + 1 <= req?.query?.end) {
          return item;
        }
      });

      return res.status(200).json({
        message: `${req?.query?.start} Number User Data To ${req?.query?.end} Number User Data`,
        status: 200,
        data: FilterByQuery,
      });
    }

    return res.status(200).json({
      message: "All User",
      status: 200,
      data: allUserSearchByDb,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const singleUserService = async (req, res) => {
  try {
    const phone = req?.params?.phone;

    const userSearchByPhone = await UserModel.findOne({ phone }).select(
      "_id name phone email role profile status nationalID"
    );
    if (userSearchByPhone) {
      return res.status(200).json({
        message: `${userSearchByPhone?.name} User All Details`,
        status: 200,
        data: userSearchByPhone,
      });
    } else {
      return res.status(200).json({
        message: "User Not Found",
        status: 404,
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const userImageUploadService = async (req, res) => {
  try {
    const { phone } = req.params;

    // Fetch user by phone
    const user = await UserModel.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User Not Found",
        data: [],
      });
    }

    return upload.fields([
      { name: "profile", maxCount: 1 }, // Handle profile image upload
      { name: "nationalID.front", maxCount: 1 }, // Handle front of national ID upload
      { name: "nationalID.back", maxCount: 1 }, // Handle back of national ID upload
    ])(req, res, async (error) => {
      if (error) {
        res
          .status(200)
          .json({ message: "Image upload failed", data: [], status: 400 });
      }

      // Prepare the updated data
      const updatedData = {
        ...user,
        profile: req.files?.profile?.[0]?.path ?? user.profile,
        nationalID: {
          front:
            req.files?.["nationalID.front"]?.[0]?.path ??
            user.nationalID?.front,
          back:
            req.files?.["nationalID.back"]?.[0]?.path ?? user.nationalID?.back,
        },
      };

      // Update the user document with new data
      Object.assign(user, updatedData);
      await user.save(); // Save the updated user

      return res
        .status(200)
        .json({ message: "Successfully updated user data",status:200, data: [] });
    });
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const updateUserDataService = async (req, res) => {
  try {
    const phone = req?.params?.phone;

    const name = req?.body?.name;
    const email = req?.body?.email;
    const role = req?.body?.role;
    const status = req?.body?.status;

    const findUserPriviusEmail = await UserModel.findOne({ email: email });

    if (!phone) {
      return res.status(200).json({
        message: "Phone number is required",
        status: 400,
        data: [],
      });
    }

    // Find the user by phone number
    const user = await UserModel.findOne({ phone });

    if (!user) {
      return res.status(200).json({
        message: "User not found",
        status: 404,
        data: [],
      });
    }

    // Update user data
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;
    user.status = status ?? user.status;
    
    // Save the updated user
    await user.save();
    return res.status(200).json({
      message: "User data updated successfully",
      status: 200,
      data: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const deleteUserService = async (req, res) => {
  try {
    const phone = req?.params?.phone;
    const userSearchByPhone = await UserModel.findOneAndDelete({ phone });

    if (userSearchByPhone) {
      const deleteUserAddress = await deleteAddress(userSearchByPhone.phone);
      const deleteUserOffer = await deleteOffer(userSearchByPhone.phone);
      const deleteUserRefCode = await deleteRefCode(userSearchByPhone.phone);

      return res.status(200).json({
        message: "User successfully deleted",
        status: 200,
        data: [],
      }); // Return success message if user is deleted
    } else {
      return res.status(200).json({
        message: "User Not Found",
        status: 404,
        data: [],
      }); // Return a 404 error if user is not found
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const verifyEmailSendService = async (req, res) => {
  try {
    const token = req?.params?.token;
    const userSearchByToken = await userTokenIdFindByToken(token);
    const userSearchByID = await UserModel.findOne({
      _id: userSearchByToken.id,
    });

    const createTokens = await createToken(userSearchByID._id);

    let transporter = nodemailer.createTransport(mailConfig.config);

    let message = {
      from: mailConfig.config.auth.user, // sender address
      to: userSearchByID.email, // list of receivers
      subject: "Email Verification From Finex", // Subject line
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    
    body {
      font-family: 'Poppins', Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      padding: 20px;
      background-color: #2f3091;
      color: #ffffff;
      border-radius: 8px 8px 0 0;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 20px;
      font-size: 16px;
      color: #333333;
    }
    .email-body p {
      margin-bottom: 20px;
    }
    .verification-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #2f3091;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 18px;
      font-weight: 500;
    }
    .about-company {
      background-color: #f0f0f0;
      padding: 15px;
      margin-top: 20px;
      border-radius: 8px;
    }
    .about-company h2 {
      font-size: 20px;
      color: #2f3091;
      margin-top: 0;
      font-weight: 600;
    }
    .about-company p {
      font-size: 14px;
      color: #555555;
      margin: 0;
      font-weight: 400;
    }
    .email-footer {
      padding: 20px;
      background-color: #2f3091;
      color: #ffffff;
      text-align: center;
      border-radius: 0 0 8px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .email-footer img {
      max-width: 100px;
    }
    .email-footer .company-info {
      text-align: right;
      font-size: 14px;
      color: #ffffff;
    }
    .email-footer p {
      margin: 5px 0;
    }
    .email-footer a {
      color: #ffffff;
      text-decoration: none;
    }
    .email-footer a:hover {
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .email-container {
        width: 350px;
        margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .email-footer {
        flex-direction: column;
        align-items: center;
      }
      .email-footer img {
        margin-bottom: 15px;
      }
      .email-footer .company-info {
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Welcome to Faster International Express</h1>
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>Thank you for signing up! Please click the button below to verify your email address and complete your registration:</p>

      <!-- Email Verification Form -->
      <form action="http://localhost:5000/api/v1/account/email-verify/confirm/${createTokens.token}" method="POST" style="text-align: center;">
        <input type="hidden" name="token" value="${createTokens.token}">
        <button type="submit" class="verification-button">Verify Email</button>
      </form>

      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>Thank you for choosing Faster International Express!</p>

      <!-- About Company Section -->
      <div class="about-company">
        <h2>About Faster International Express</h2>
        <p>Faster International Express is dedicated to providing reliable and swift delivery services worldwide. Based in Dhaka, Bangladesh, we are committed to ensuring that your parcels are delivered safely and on time. We prioritize customer satisfaction with a focus on efficiency and service quality.</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <img src="https://mailsend-email-assets.mailtrap.io/jlqf1bnadrtx29yvi1wfepnmmcj8.png" alt="Company Logo">
      <div class="company-info">
        <p>&copy; 2024 Faster International Express. All rights reserved.</p>
        <p>HOUSE-19, ROAD-12, SECTOR-01, UTTARA, DHAKA-1230</p>
        <p>Email: <a href="mailto:faster.in.ex@gmail.com">faster.in.ex@gmail.com</a></p>
        <p>Phone: <a href="tel:+8801577057714">01577057714</a></p>
      </div>
    </div>
  </div>
</body>
</html>`,

      //next time changes button link
    };

    transporter
      .sendMail(message)
      .then((info) => {
        return res.status(201).json({
          msg: "Email sent",
        });
      })
      .catch((err) => {
        return res.status(200).json({ msg: err, status: 400, data: [] });
      });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const confirmEmailVerifyService = async (req, res) => {
  try {
    const token = req?.params?.token;
    const deleteToken = await TokenModel.findOneAndDelete({ token: token });

    if (deleteToken) {
      const findUserByTokenToGetUserId = await UserModel.findOne({
        _id: deleteToken.id,
      });
      findUserByTokenToGetUserId.status = true;
      await findUserByTokenToGetUserId.save();

      return res.status(200).json({
        message: "Verification Successfull",
        status: 200,
        data: [],
      });
    }

    return res.status(200).json({
      message: "Token Not Found And verification failed ",
      status: 404,
      data: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const resetPasswordEmailSendService = async (req, res) => {
  try {
    const token = req?.params?.token;
    const userSearchByToken = await userTokenIdFindByToken(token);
    const userSearchByID = await UserModel.findOne({
      _id: userSearchByToken.id,
    });

    const createTokens = await createToken(userSearchByID._id);

    let transporter = nodemailer.createTransport(mailConfig.config);

    let message = {
      from: mailConfig.config.auth.user, // sender address
      to: userSearchByID.email, // list of receivers
      subject: "Reset Password Finex Web App", // Subject line
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    
    body {
      font-family: 'Poppins', Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      padding: 20px;
      background-color: #2f3091;
      color: #ffffff;
      border-radius: 8px 8px 0 0;
    }
    .email-header img {
      max-width: 150px;
      margin-bottom: 10px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 20px;
      font-size: 16px;
      color: #333333;
    }
    .email-body p {
      margin-bottom: 20px;
    }
    .reset-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #2f3091;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 18px;
      font-weight: 500;
    }
    .about-company {
      background-color: #f0f0f0;
      padding: 15px;
      margin-top: 20px;
      border-radius: 8px;
    }
    .about-company h2 {
      font-size: 20px;
      color: #2f3091;
      margin-top: 0;
      font-weight: 600;
    }
    .about-company p {
      font-size: 14px;
      color: #555555;
      margin: 0;
      font-weight: 400;
    }
    .email-footer {
      padding: 20px;
      background-color: #2f3091;
      color: #ffffff;
      text-align: center;
      border-radius: 0 0 8px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .email-footer img {
      max-width: 100px;
    }
    .email-footer .company-info {
      text-align: right;
      font-size: 14px;
      color: #ffffff;
    }
    .email-footer p {
      margin: 5px 0;
    }
    .email-footer a {
      color: #ffffff;
      text-decoration: none;
    }
    .email-footer a:hover {
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .email-container {
        width: 100%;
      }
      .email-footer {
        flex-direction: column;
        align-items: center;
      }
      .email-footer img {
        margin-bottom: 15px;
      }
      .email-footer .company-info {
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
<h1>Welcome to Faster International Express</h1>
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>We received a request to reset your password. You can reset it using the button below:</p>
      <p style="text-align: center;">
        <a href="http://localhost:5000/api/v1/account/reset-password/confirm/${createTokens.token}" class="reset-button">Reset Password</a>
      </p>

      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Thank you for choosing Faster International Express!</p>

      <!-- About Company Section -->
      <div class="about-company">
        <h2>About Faster International Express</h2>
        <p>Faster International Express is dedicated to providing reliable and swift delivery services worldwide. Based in Dhaka, Bangladesh, we are committed to ensuring that your parcels are delivered safely and on time. We prioritize customer satisfaction with a focus on efficiency and service quality.</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <img src="https://mailsend-email-assets.mailtrap.io/jlqf1bnadrtx29yvi1wfepnmmcj8.png" alt="Company Logo">
      <div class="company-info">
        <p>&copy; 2024 Faster International Express. All rights reserved.</p>
        <p>HOUSE-19, ROAD-12, SECTOR-01, UTTARA, DHAKA-1230</p>
        <p>Email: <a href="mailto:faster.in.ex@gmail.com">faster.in.ex@gmail.com</a></p>
        <p>Phone: <a href="tel:+8801577057714">01577057714</a></p>
      </div>
    </div>
  </div>
</body>
</html>`,

      //next time changes button link
    };

    transporter
      .sendMail(message)
      .then((info) => {
        return res.status(201).json({
          msg: "Email sent",
        });
      })
      .catch((err) => {
        return res.status(200).json({ msg: err, status: 400, data: [] });
      });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const confirmResetPasswordService = async (req, res) => {
  try {
    const token = req?.params?.token;
    const deleteToken = await TokenModel.findOneAndDelete({ token: token });

    if (deleteToken) {
      const findUserByTokenToGetUserId = await UserModel.findOne({
        _id: deleteToken.id,
      });

      findUserByTokenToGetUserId.password =
        req?.body?.newPassword.length > 0
          ? convertHash(req?.body?.newPassword)
          : findUserByTokenToGetUserId.password;
      await findUserByTokenToGetUserId.save();

      return res.status(200).json({
        message: "Successfully Changed Password",
        status: 200,
        data: [],
      });
    }

    return res.status(200).json({
      message: "Token Not Found And verification failed ",
      status: 404,
      data: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};

const allUserAddressService = async (req, res) => {
  try {
    const addresses = await AddressModel.find(); // Fetch all addresses
    return res.status(200).json({
      message: "Addresses fetched successfully",
      status: 200,
      data: addresses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in service",
      status: 500,
      data: [],
    });
  }
};
const singleUserAddressService = async (req, res) => {
  try {
    const address = await AddressModel.findOne({ phone: req.params.phone }); // Find address by phone
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Address fetched successfully",
      status: 200,
      data: address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const updateUserAddressService = async (req, res) => {
  const { region, city, area, address } = req.body; // Extract data from req.body

  try {
    const updatedAddress = await AddressModel.findOneAndUpdate(
      { phone: req.params.phone },
      { region, city, area, address }, // Use extracted data
      { new: true } // Return the updated document
    );
    if (!updatedAddress) {
      return res.status(404).json({
        message: "Address not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Address updated successfully",
      status: 200,
      data: updatedAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const deleteUserAddressService = async (req, res) => {
  try {
    const deletedAddress = await AddressModel.findOneAndDelete({
      phone: req.params.phone,
    });
    if (!deletedAddress) {
      return res.status(404).json({
        message: "Address not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Address deleted successfully",
      status: 200,
      data: deletedAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};

const allUserOfferService = async (req, res) => {
  try {
    const offers = await OfferModel.find(); // Fetch all offers
    return res.status(200).json({
      message: "Offers fetched successfully",
      status: 200,
      data: offers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in service",
      status: 500,
      error: error.message,
    });
  }
};
const singleUserOfferService = async (req, res) => {
  try {
    const offer = await OfferModel.findOne({ phone: req.params.phone }); // Find offer by phone
    if (!offer) {
      return res.status(404).json({
        message: "Offer not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Offer fetched successfully",
      status: 200,
      data: offer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in service",
      status: 500,
      error: error.message,
    });
  }
};
const updateUserOfferService = async (req, res) => {
  const { offer, discount, monthInTotalShipment } = req.body; // Extract data from req.body

  try {
    const updatedOffer = await OfferModel.findOneAndUpdate(
      { phone: req.params.phone },
      { offer, discount, monthInTotalShipment }, // Update with new data
      { new: true } // Return the updated document
    );
    if (!updatedOffer) {
      return res.status(404).json({
        message: "Offer not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Offer updated successfully",
      status: 200,
      data: updatedOffer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in service",
      status: 500,
      error: error.message,
    });
  }
};
const deleteUserOfferService = async (req, res) => {
  try {
    const deletedOffer = await OfferModel.findOneAndDelete({
      phone: req.params.phone,
    });
    if (!deletedOffer) {
      return res.status(404).json({
        message: "Offer not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Offer deleted successfully",
      status: 200,
      data: deletedOffer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in service",
      status: 500,
      error: error.message,
    });
  }
};

const allUserReferenceService = async (req, res) => {
  try {
    const references = await ReferenceModel.find(); // Fetch all references
    return res.status(200).json({
      message: "References fetched successfully",
      status: 200,
      data: references,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const singleUserReferenceService = async (req, res) => {
  try {
    const reference = await ReferenceModel.findOne({ phone: req.params.phone }); // Find reference by phone
    if (!reference) {
      return res.status(404).json({
        message: "Reference not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Reference fetched successfully",
      status: 200,
      data: reference,
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const updateUserReferenceService = async (req, res) => {
  try {
    const { codeUsedByUser } = req.body; // Extract data from req.body
    const updatedReference = await ReferenceModel.findOneAndUpdate(
      { phone: req.params.phone },
      { codeUsedByUser }, // Update with new data
      { new: true } // Return the updated document
    );
    if (!updatedReference) {
      return res.status(404).json({
        message: "Reference not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Reference updated successfully",
      status: 200,
      data: updatedReference,
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const deleteUserReferenceService = async (req, res) => {
  try {
    const deletedReference = await ReferenceModel.findOneAndDelete({
      phone: req.params.phone,
    });
    if (!deletedReference) {
      return res.status(404).json({
        message: "Reference not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Reference deleted successfully",
      status: 200,
      data: deletedReference,
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
  allUserService,
  singleUserService,
  userImageUploadService,
  updateUserDataService,
  deleteUserService,
  verifyEmailSendService,
  confirmEmailVerifyService,
  resetPasswordEmailSendService,
  confirmResetPasswordService,
  allUserAddressService,
  singleUserAddressService,
  updateUserAddressService,
  deleteUserAddressService,
  allUserOfferService,
  singleUserOfferService,
  updateUserOfferService,
  deleteUserOfferService,
  allUserReferenceService,
  singleUserReferenceService,
  updateUserReferenceService,
  deleteUserReferenceService,
};
