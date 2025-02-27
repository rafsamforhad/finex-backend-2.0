const PriceModel = require("../../models/v1/Price.Model");

const priceQuoteService = async (req, res) => {
  try {
    const fromCountryId = req?.params?.from;
    const toCountryId = req?.params?.to;

    console.log(fromCountryId != "" && toCountryId != "");
    if (fromCountryId != "" && toCountryId != "") {
      // Fetch all price lists from the database
      const allPriceList = (await PriceModel.find()).reverse();

      // Find the price list for the specified countries
      const findPriceList = allPriceList.find((price) => {
        return price.from._id == fromCountryId && price.to._id == toCountryId;
      });

      if (findPriceList) {
        return res.status(200).json({
          message: `${findPriceList.from.name} to ${findPriceList.to.name} Price List`,
          status: 200,
          data: findPriceList,
        });
      } else {
        return res.status(200).json({
          message: "Price List Not Found",
          status: 404,
          data: [],
        });
      }
    } else {
      return res.status(200).json({
        message: "Not allowed to access",
        status: 400,
        data: [],
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};

const allPriceListService = async (req, res) => {
  try {
    const allPriceList = await PriceModel.find();

    res.status(200).json({
      message: "All Price List",
      status: 200,
      data: allPriceList,
    });
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const singlePriceListService = async (req, res) => {
  try {
    const id = req.params.id;
    const findPriceList = await PriceModel.findOne({ _id: id });
    if (findPriceList) {
      res.status(200).json({
        message: `${findPriceList.from.country} to ${findPriceList.to.country} Price List`,
        status: 200,
        data: findPriceList,
      });
    } else {
      res.status(200).json({
        message: "Price List Not Found",
        status: 404,
        data: [],
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const createPriceListService = async (req, res) => {
  try {
    // Handle POST request to create a new price list
    const {
      fromCountry,
      toCountry,
      premiumRate,
      affordableRate,
      economyRate,
      gift,
    } = req.body;

    if (
      fromCountry &&
      toCountry &&
      premiumRate &&
      affordableRate &&
      economyRate &&
      gift
    ) {
      const initPriceListData = new PriceModel({
        from: fromCountry,
        to: toCountry,
        premium: premiumRate,
        affordable: affordableRate,
        economy: economyRate,
        gift: gift,
      });

      await initPriceListData.save();

      return res.status(200).json({
        message: "Price List Created",
        status: 200,
        data: [],
      });
    } else {
      // Return error response for missing or invalid data
      return res.status(200).json({
        message: "Provide Valid Data",
        status: 400,
        data: [],
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const updatePriceListService = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      fromCountry,
      toCountry,
      gift,
      premiumRate,
      affordableRate,
      economyRate,
    } = req.body;

    // Update price list with provided data

    // Fetch price list for specific from and to country IDs
    const findPriceList = await PriceModel.findOne({ _id: id });

    if (!findPriceList) {
      res.status(200).json({
        message: "Price List Not Found",
        status: 404,
        data: [],
      });
    }

    if (
      fromCountry ||
      toCountry ||
      premiumRate ||
      affordableRate ||
      economyRate ||
      gift
    ) {
      findPriceList.from = fromCountry ?? findPriceList.from;
      findPriceList.to = toCountry ?? findPriceList.to;
      findPriceList.gift = gift ?? findPriceList.gift;
      findPriceList.premium = premiumRate ?? findPriceList.premium;
      findPriceList.affordable = affordableRate ?? findPriceList.affordable;
      findPriceList.economy = economyRate ?? findPriceList.economy;

      // Save the updated price list
      await findPriceList.save();
      // Return success response
      return res.status(200).json({
        message: "Update Price List",
        status: 200,
        data: [],
      });
    } else {
      // Return error response if no update data is provided
      return res.status(200).json({
        message: "send valid data",
        status: 400,
        data: [],
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const deletePriceListService = async (req, res) => {
  try {
    const id = req.params.id;
    const deletePriceList = await PriceModel.findOneAndDelete({ _id: id });
    return res.status(200).json({
      message: `Delete ${deletePriceList?.from?.name} to ${deletePriceList?.to?.name} Price List`,
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
  priceQuoteService,
  allPriceListService,
  singlePriceListService,
  createPriceListService,
  updatePriceListService,
  deletePriceListService,
};
