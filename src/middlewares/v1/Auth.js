const TokenModel = require("../../models/v1/Token.Model");

const checkAuth = async (req, res, next) => {
  try {
    const { headers } = req;
    const token = headers.authorization;

    if (token) {
      const checkToken = await TokenModel.findOne({ token });
      if (checkToken) {
        next();
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
    return res.status(200).json({
      message: "Internal server said service error",
      status: 500,
      data: [],
    });
  }
};

module.exports = checkAuth