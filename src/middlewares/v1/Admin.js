const TokenModel = require("../../models/v1/Token.Model");
const UserModel = require("../../models/v1/User.Model");

const adminCheck = async (req, res, next) => {
  try {
    const { headers } = req;
    const token = headers.authorization;

    if (token) {
      const checkToken = await TokenModel.findOne({ token });
      if (checkToken) {
        const findUser = await UserModel.findOne({ _id: checkToken.id });
        if (findUser.role == "ADMIN") {
          next();
        } else {
          return res.status(200).json({
            message: "you Are Not Allow. you Are Not Admin.",
            status: 401,
            data: [],
          });
        }
      } else {
        return res.status(200).json({
          message: "Authentication failed",
          status: 401,
          data: [],
        });
      }
    } else {
      return res.status(200).json({
        message: "Send Token",
        status: 400,
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    
    return res.status(200).json({
      message: "Internal server said service error",
      status: 500,
      data: [],
    });
  }
};

module.exports = adminCheck;
