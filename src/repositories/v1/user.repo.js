const AddressModel = require("../../models/v1/Address.Model");
const OfferModel = require("../../models/v1/Offer.Model");
const ReferenceModel = require("../../models/v1/Reference.Model");
const TokenModel = require("../../models/v1/Token.Model");
const UserModel = require("../../models/v1/User.Model");
const { convertHash } = require("../../utils/hash");
const stringGenerator = require("../../utils/stringGenarator");

const userFindByEmail = async (email) => {
  const searchByDb = await UserModel.findOne({ email });
  return searchByDb;
};
const userFindByPhone = async (phone) => {
  const searchByDb = await UserModel.findOne({ phone });
  return searchByDb;
};
const createNewUser = async (name, email, phone, role, password) => {
  const hashPassword = convertHash(password);

  const createUserDataInDb = new UserModel({
    name,
    email,
    phone,
    role,
    password: hashPassword,
  });
  const userCreatedData = await createUserDataInDb.save();
  return userCreatedData;
};
const createToken = async (id) => {
  const newToken = new TokenModel({
    id,
    token: stringGenerator(),
  });
  const token = await newToken.save();

  return token;
};
const userTokenIdFindByToken = async (token) => {
  const searchToken = await TokenModel.findOne({ token });
  return searchToken;
};
const deleteToken = async (id) => {
  const deleteToken = await TokenModel.findByIdAndDelete({
    _id: id,
  });

  return deleteToken;
};
const createAddress = async (phone, region, city, area, address) => {
  const newAddressCreate = new AddressModel({
    phone,
  });
  const createdAddress = await newAddressCreate.save();
  return createdAddress;
};
const deleteAddress = async (phone) => {
  const deleteUserAddress = await AddressModel.deleteOne({ phone });
  return deleteUserAddress;
};
const createOffer = async(phone)=>{
  const newUserOffer = new OfferModel({phone})
  const createdOfferData = await newUserOffer.save()
  return createdOfferData
}
const deleteOffer = async (phone)=>{
  const deleteUserOffer = await OfferModel.deleteOne({ phone });
  return deleteUserOffer;
}
const createRefCode = async (phone)=>{
  const newUserRefCode = new ReferenceModel({phone})
  const createdRefCodeData = await newUserRefCode.save()
  return createdRefCodeData
}
const deleteRefCode = async (phone)=>{
  const deleteUserRefCode = await ReferenceModel.deleteOne({ phone });
  return deleteUserRefCode;
}


module.exports = {
  userFindByEmail,
  userFindByPhone,
  createNewUser,
  createToken,
  userTokenIdFindByToken,
  deleteToken,
  createAddress,
  deleteAddress,createOffer,deleteOffer,createRefCode,deleteRefCode
};
