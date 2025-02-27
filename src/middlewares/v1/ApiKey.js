
const ApiKey = async (req, res, next) => {
  try {
    const { headers } = req;
    const apiKey = headers['finex'];
    if (apiKey) {
        const checkingkey = apiKey == "finex157705771418342144011930631910" ? true : false
        if (checkingkey) {
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
        message: "Send Api Key",
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

module.exports = ApiKey