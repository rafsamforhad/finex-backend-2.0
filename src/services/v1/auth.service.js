const AddressModel = require("../../models/v1/Address.Model");
const {
  userFindByEmail,
  userFindByPhone,
  createNewUser,
  createToken,
  userTokenIdFindByToken,
  deleteToken,
  createAddress,
  createOffer,
  createRefCode,
} = require("../../repositories/v1/user.repo");
const { compareHash } = require("../../utils/hash");

const registerService = async (req, res) => {
  try {
    const name = req?.body?.name?.length > 0 ? req.body.name : false;
    const email = req?.body?.email?.length > 0 ? req.body.email : false;
    const phone = req?.body?.phone?.length > 0 ? req.body.phone : false;
    const password =
      req?.body?.password?.length > 0 ? req.body.password : false;
    const role = req?.body?.role?.length > 0 ? req.body.role : "B2C";

    if (name && email && phone && role && password) {
      const checkEmail = await userFindByEmail(email);
      const checkPhone = await userFindByPhone(phone);

      if (checkEmail && checkPhone)
        return res.status(200).json({
          message: "Email and Phone number alrady used another account",
          status: 400,
          data: [],
        });

      if (checkEmail)
        return res.status(200).json({
          message: "email alrady used another account",
          status: 400,
          data: [],
        });

      if (checkPhone)
        return res.status(200).json({
          message: "Phone number alrady used another account",
          status: 400,
          data: [],
        });

      const user = await createNewUser(name,email ,phone , role, password);
      const userAddress = await createAddress(phone)
      const userOffer = await createOffer(phone)
      const userRefCode = await createRefCode(phone)


      return res
        .status(200)
        .json({ message: "registation successfull", status: 200, data:user });
    } else {
      return res.status(200).json({
        message: "send valid information",
        status: 400,
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server said service error",
      status: 400,
      data: [],
    });
  }
};
const loginService = async (req, res) => {
  try {
    const phone = req?.body?.phone?.length > 0 ? req.body.phone : false;
    const password =
      req?.body?.password?.length > 0 ? req.body.password : false;

    const findUser = await userFindByPhone(phone);

    if (findUser) {
      if (compareHash(password, findUser.password)) {
        const token = await createToken(findUser.id);
        const user = {
          name: findUser.name,
          phone: findUser.phone,
          email: findUser.email,
          role: findUser.role,
          status: findUser.status,
        };
        return res.status(200).json({
          message: "login successfull",
          data: { token: token.token, user },
          status: 200,
        });
      } else {
        return res
          .status(200)
          .json({ message: "Incorrect password", status: 401, data: [] });
      }
    } else {
      return res
        .status(200)
        .json({ message: "Phone number is not valid", status: 404, data: [] });
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
const logoutService = async (req, res) => {
  try {
    const token = req?.headers?.authorization;

    const findTokenID = await userTokenIdFindByToken(token);

    if (findTokenID) {
      const deleteUserToken = await deleteToken(findTokenID._id);

      return res
        .status(200)
        .json({ message: "Logout successfull", status: 200, data: [] });
    } else {
      return res
        .status(200)
        .json({ message: "you are not allow", status: 401, data: [] });
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

module.exports = {
  registerService,
  loginService,
  logoutService,
};
