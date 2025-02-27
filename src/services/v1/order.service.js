const mailConfig = require("../../config/mailConfig");
const OfferModel = require("../../models/v1/Offer.Model");
const OrderModel = require("../../models/v1/Order.Model");
const PriceModel = require("../../models/v1/Price.Model");
const TrackModel = require("../../models/v1/Track.Model");
const UserModel = require("../../models/v1/User.Model");
const { createOrder } = require("../../repositories/v1/order.repo");
const { createTracking } = require("../../repositories/v1/track.repo");
const trackingGenerator = require("../../utils/trackingGenarator");
const nodemailer = require("nodemailer");

// Helper function to calculate DHL price based on weight in KG
function calculatePremiumPrice(weight, priceInfo) {
  if (weight >= 6 && weight <= 10) return weight * priceInfo.kg6to10;
  if (weight >= 11 && weight <= 15) return weight * priceInfo.kg11to15;
  if (weight >= 15 && weight <= 20) return weight * priceInfo.kg16to20;
  if (weight >= 21 && weight <= 25) return weight * priceInfo.kg21to25;
  if (weight >= 26 && weight <= 30) return weight * priceInfo.kg26to30;
  if (weight >= 31 && weight <= 40) return weight * priceInfo.kg31to40;
  if (weight >= 41 && weight <= 50) return weight * priceInfo.kg41to50;
  if (weight >= 51 && weight <= 80) return weight * priceInfo.kg51to80;
  if (weight >= 81 && weight <= 100) return weight * priceInfo.kg81to100;
  if (weight >= 101 && weight <= 500) return weight * priceInfo.kg101to500;
  if (weight >= 501 && weight <= 1000) return weight * priceInfo.kg501to1000;
  return null;
}
// Helper function to calculate DHL price based on weight in GM
function calculatePremiumPriceInGM(weight, priceInfo) {
  if (weight <= 500) return priceInfo.gm500;
  if (weight >= 501 && weight <= 1000) return priceInfo.gm1000;
  if (weight >= 1001 && weight <= 1500) return priceInfo.gm1500;
  if (weight >= 1501 && weight <= 2000) return priceInfo.gm2000;
  if (weight >= 2001 && weight <= 2500) return priceInfo.gm2500;
  if (weight >= 2501 && weight <= 3000) return priceInfo.gm3000;
  if (weight >= 3001 && weight <= 3500) return priceInfo.gm3500;
  if (weight >= 3501 && weight <= 4000) return priceInfo.gm4000;
  if (weight >= 4001 && weight <= 4500) return priceInfo.gm4500;
  if (weight >= 4501 && weight <= 5000) return priceInfo.gm5000;
  if (weight >= 5001 && weight <= 5500) return priceInfo.gm5500;
  return null;
}
// Helper function to calculate FedEx price based on weight in KG
function calculateAffordablePrice(weight, priceInfo) {
  if (weight >= 6 && weight <= 10) return weight * priceInfo.kg6to10;
  if (weight >= 11 && weight <= 15) return weight * priceInfo.kg11to15;
  if (weight >= 15 && weight <= 20) return weight * priceInfo.kg16to20;
  if (weight >= 21 && weight <= 25) return weight * priceInfo.kg21to25;
  if (weight >= 26 && weight <= 30) return weight * priceInfo.kg26to30;
  if (weight >= 31 && weight <= 40) return weight * priceInfo.kg31to40;
  if (weight >= 41 && weight <= 50) return weight * priceInfo.kg41to50;
  if (weight >= 51 && weight <= 80) return weight * priceInfo.kg51to80;
  if (weight >= 81 && weight <= 100) return weight * priceInfo.kg81to100;
  if (weight >= 101 && weight <= 500) return weight * priceInfo.kg101to500;
  if (weight >= 501 && weight <= 1000) return weight * priceInfo.kg501to1000;
  return null;
}
// Helper function to calculate FedEx price based on weight in GM
function calculateAffordablePriceInGM(weight, priceInfo) {
  if (weight <= 500) return priceInfo.gm500;
  if (weight >= 501 && weight <= 1000) return priceInfo.gm1000;
  if (weight >= 1001 && weight <= 1500) return priceInfo.gm1500;
  if (weight >= 1501 && weight <= 2000) return priceInfo.gm2000;
  if (weight >= 2001 && weight <= 2500) return priceInfo.gm2500;
  if (weight >= 2501 && weight <= 3000) return priceInfo.gm3000;
  if (weight >= 3001 && weight <= 3500) return priceInfo.gm3500;
  if (weight >= 3501 && weight <= 4000) return priceInfo.gm4000;
  if (weight >= 4001 && weight <= 4500) return priceInfo.gm4500;
  if (weight >= 4501 && weight <= 5000) return priceInfo.gm5000;
  if (weight >= 5001 && weight <= 5500) return priceInfo.gm5500;
  return null;
}
// Helper function to calculate UPS price based on weight in KG
function calculateEconomyPrice(weight, priceInfo) {
  if (weight >= 6 && weight <= 10) return weight * priceInfo.kg6to10;
  if (weight >= 11 && weight <= 15) return weight * priceInfo.kg11to15;
  if (weight >= 15 && weight <= 20) return weight * priceInfo.kg16to20;
  if (weight >= 21 && weight <= 25) return weight * priceInfo.kg21to25;
  if (weight >= 26 && weight <= 30) return weight * priceInfo.kg26to30;
  if (weight >= 31 && weight <= 40) return weight * priceInfo.kg31to40;
  if (weight >= 41 && weight <= 50) return weight * priceInfo.kg41to50;
  if (weight >= 51 && weight <= 80) return weight * priceInfo.kg51to80;
  if (weight >= 81 && weight <= 100) return weight * priceInfo.kg81to100;
  if (weight >= 101 && weight <= 500) return weight * priceInfo.kg101to500;
  if (weight >= 501 && weight <= 1000) return weight * priceInfo.kg501to1000;
  return null;
}
// Helper function to calculate UPS price based on weight in GM
function calculateEconomyPriceInGM(weight, priceInfo) {
  if (weight <= 500) return priceInfo.gm500;
  if (weight >= 501 && weight <= 1000) return priceInfo.gm1000;
  if (weight >= 1001 && weight <= 1500) return priceInfo.gm1500;
  if (weight >= 1501 && weight <= 2000) return priceInfo.gm2000;
  if (weight >= 2001 && weight <= 2500) return priceInfo.gm2500;
  if (weight >= 2501 && weight <= 3000) return priceInfo.gm3000;
  if (weight >= 3001 && weight <= 3500) return priceInfo.gm3500;
  if (weight >= 3501 && weight <= 4000) return priceInfo.gm4000;
  if (weight >= 4001 && weight <= 4500) return priceInfo.gm4500;
  if (weight >= 4501 && weight <= 5000) return priceInfo.gm5000;
  if (weight >= 5001 && weight <= 5500) return priceInfo.gm5500;
  return null;
}

const allOrderService = async (req, res) => {
  try {
    const allOrderData = await OrderModel.find();

    return res.status(200).json({
      message: "All Order Data",
      status: 200,
      data: allOrderData,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const singleOrderService = async (req, res) => {
  try {
    const trackID = req.params.trackID;
    const findOrder = await OrderModel.findOne({ trackId: trackID });
    if (findOrder) {
      return res.status(200).json({
        message: "Order Data",
        status: 200,
        data: findOrder,
      });
    }
    return res.status(200).json({
      message: "Order Not Found",
      status: 500,
      data: [],
    });
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const createOrderService = async (req, res) => {
  try {
    const {
      parcelFromAndToId,
      customarPhone,
      creatorPhone,
      parcel,
      weight,
      serviceType,
      itemType,
      orderDate,
      box,
    } = req?.body;

    const findCustomer = await UserModel.findOne({ phone: customarPhone });
    if (findCustomer) {
      const findPrice = await PriceModel.findOne({ _id: parcelFromAndToId });

      if (findPrice) {
        let price;
        let giftedParcentis = 0;
        let discountPercentage = 0;
        const weightSplit = weight.split(" ");
        const parcelWeight = Number(weightSplit[0]);
        const weightType = weightSplit[1];

        if (serviceType === "premium") {
          if (weightType === "KG" || weightType === "kg") {
            // DHL pricing based on weight in KG
            price = calculatePremiumPrice(parcelWeight, findPrice.premium);
          } else if (weightType === "GM" || weightType === "gm") {
            // DHL pricing based on weight in GM
            price = calculatePremiumPriceInGM(parcelWeight, findPrice.premium);
          } else {
            return res.status(200).json({
              message: "Weight type wrong. Please provide correct weight type",
              status: 400,
              data: [],
            });
          }
        } else if (serviceType === "affordable") {
          if (weightType === "KG" || weightType === "kg") {
            // FedEx pricing based on weight in KG
            price = calculateAffordablePrice(parcelWeight, findPrice.affordable);
          } else if (weightType === "GM" || weightType === "gm") {
            // FedEx pricing based on weight in GM
            price = calculateAffordablePriceInGM(parcelWeight, findPrice.affordable);
          } else {
            return res.status(200).json({
              message: "Weight type wrong. Please provide correct weight type",
              status: 400,
              data: [],
            });
          }
        } else if (serviceType === "economy") {
          if (weightType === "KG" || weightType === "kg") {
            // UPS pricing based on weight in KG
            price = calculateEconomyPrice(parcelWeight, findPrice.economy);
          } else if (weightType === "GM" || weightType === "gm") {
            // UPS pricing based on weight in GM
            price = calculateEconomyPriceInGM(parcelWeight, findPrice.economy);
          } else {
            return res.status(200).json({
              message: "Weight type wrong. Please provide correct weight type",
              status: 400,
              data: [],
            });
          }
        } else {
          return res.status(200).json({
            message: "Service type not supported",
            status: 400,
            data: [],
          });
        }

        if (itemType === "Gift" || itemType === "gift" ) {
          giftedParcentis =
            parcelWeight >= 1 && parcelWeight <= 5500
              ? 3500
              : (price / 100) * 16;
        }

        price += giftedParcentis;

        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const findOffer = await OfferModel.findOne({ phone: customarPhone });

        if (findOffer) {
          if (findOffer.offer.type == "STANDARD") {
            const findMonthTotalShipment = findOffer.monthInTotalShipment?.find(
              (singleMonthData) =>
                singleMonthData?.month == monthNames[new Date().getMonth()]
            );

            if (findMonthTotalShipment?.totalShipment >= 10) {
              discountPercentage = 5;
              discountPrice = price * (discountPercentage / 100);
              price = price - discountPrice;
            }
          } else if (findOffer.offer.type == "PREMIUM") {
            if (findMonthTotalShipment?.totalShipment >= 5) {
              discountPercentage = 5;
              discountPrice = price * (discountPercentage / 100);
              price = price - discountPrice;
            }
          }
          if (
            typeof findOffer.discount == "number" &&
            findOffer.discount >= 1
          ) {
            discountPercentage = findOffer.discount;
            discountPrice = price * (findOffer.discount / 100);
            price = price - discountPrice;
          }
        }

        const payment = {
          pType: "",
          pAmount: Math.round(price + 0.4),
          pOfferDiscount: `${discountPercentage}%`,
          pExtraCharge: 0,
          pDiscount: 0,
          pRecived: 0,
        };

        // Create new order and tracking
        const createNewOrder = await createOrder(
          customarPhone,
          creatorPhone,
          parcel,
          orderDate || new Date(),
          payment,
          box,
          trackingGenerator()
        );

        const createNewTracking = await createTracking(
          createNewOrder.trackId,
          parcel,
          box
        );

        let transporter = nodemailer.createTransport(mailConfig.config);

        let message = {
          from: "finex.in.ex@gmail.com", // sender address
          to: parcel?.sender?.email, // list of receivers
          subject: `Order(ID:${createNewOrder?._id}) Invoice - Faster International Express`, // Subject line
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Invoice - Faster International Express</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    
    body {
      font-family: 'Poppins', Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.1);
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
    .invoice-design {
      position: relative;
      margin-bottom: 20px;
    }
    .invoice-design .rotate-text {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%) rotate(-45deg);
      font-size: 40px;
      color: rgba(0, 0, 0, 0.1);
      font-weight: bold;
      text-align: center;
      width: 100%;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    table, th, td {
      border: 1px solid #dddddd;
      padding: 8px;
    }
    th {
      background-color: #f0f0f0;
    }
    .invoice-section {
      margin-top: 20px;
    }
    .invoice-section h2 {
      font-size: 18px;
      color: #2f3091;
      margin-top: 0;
      font-weight: 600;
    }
    .email-footer {
      padding: 20px;
      background-color: #2f3091;
      color: #ffffff;
      text-align: center;
      border-radius: 0 0 8px 8px;
    }
    .flex-container {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 20px;
    }
    .flex-container > div {
      flex: 1;
    }
    button {
      background-color: #2f3091;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    /* Responsive styles */
    @media (max-width: 600px) {
      .email-container {
        width: 100%;
      }
      .email-header h1 {
        font-size: 20px;
      }
      .invoice-design .rotate-text {
        font-size: 30px;
      }
      .flex-container {
        flex-direction: column;
      }
      .flex-container > div {
        width: 100%;
      }
      table, th, td {
        font-size: 14px;
        padding: 6px;
      }
      button {
        width: 100%;
        padding: 10px;
        font-size: 16px;
      }

      
    }

    @media (max-width: 400px) {
      .email-header h1 {
        font-size: 18px;
      }
      .email-body {
        font-size: 14px;
      }
      .invoice-design .rotate-text {
        font-size: 25px;
      }
      table, th, td {
        font-size: 12px;
        padding: 4px;
      }
      button {
        padding: 8px;
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Order Invoice from Faster International Express</h1>
    </div>
    <div class="email-body">
      <p>Hello ${createNewOrder?.parcel?.sender?.name},</p>
      <p>Here are your order details and payment summary for your recent transaction:</p>

      <!-- Invoice Section -->
      <div class="invoice-design">
        <div class="rotate-text">Due Payment</div>
        <div class="flex-container">
          <!-- Sender and Receiver Info -->
          <div>
            <h2 class="text-center">Sender:</h2>
            <table>
              <tr><td>Name:</td><td> ${
                createNewOrder?.parcel?.sender?.name
              }</td></tr>
              <tr><td>Phone:</td><td>${
                createNewOrder?.parcel?.sender?.phone
              }</td></tr>
              <tr><td>Email:</td><td>${
                createNewOrder?.parcel?.sender?.email
              }</td></tr>
              <tr><td>Address:</td><td>${
                createNewOrder?.parcel?.sender?.address
              }</td></tr>
            </table>
          </div>
          <div>
            <h2 class="text-center">Receiver:</h2>
            <table>
             <tr><td>Name:</td><td> ${
               createNewOrder?.parcel?.reciver?.name
             }</td></tr>
              <tr><td>Phone:</td><td>${
                createNewOrder?.parcel?.reciver?.phone
              }</td></tr>
              <tr><td>Email:</td><td>${
                createNewOrder?.parcel?.reciver?.email
              }</td></tr>
              <tr><td>Address:</td><td>${
                createNewOrder?.parcel?.reciver?.address?.address
              }, ${createNewOrder?.parcel?.reciver?.address?.city}, ${
            createNewOrder?.parcel?.reciver?.address?.zipCode
          }, ${createNewOrder?.parcel?.reciver?.address?.country}</td></tr>
            </table>
          </div>
        </div>
        
        <!-- Order Details -->
        <h2>Order Details</h2>
        <table>
          <tr><td>Date:</td><td>${createNewOrder?.orderDate}</td></tr>
          <tr><td>Order ID:</td><td>${createNewOrder?._id}</td></tr>
          <tr><td>Tracking ID:</td><td>${createNewOrder?.trackId}</td></tr>
          <tr><td>Creator Phone:</td><td>${
            createNewOrder?.creatorPhone
          }</td></tr>
        </table>

        <!-- Charge Summary -->
        <h2>Charge Summary</h2>
        <table class="charge-summary">
          <thead>
            <tr><th>Tracking ID</th><th>Item</th><th>Weight</th><th>Total Amount</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>${createNewOrder?.trackId}</td>
              <td>
               ,${createNewOrder?.parcel?.item?.list?.map(
                 (item) => `${item}, <br/>`
               )}
              </td>
              <td>${createNewOrder?.parcel?.weight}</td>
              <td>
                <div>Weight Charge:${createNewOrder?.payment?.pAmount}</div>
                <div>Extra Charge: 0</div>
                <div>Discount: 0</div>
                <div>Account Offer Discount:${
                  createNewOrder?.payment?.pOfferDiscount
                }</div>
                <hr>
                <div>Total Charge: 0</div>
                <div>Total Charge Received: 0</div>
                <hr>
                <div>Due Charge: ${createNewOrder?.payment?.pAmount}</div>
              </td>
            </tr>
          </tbody>
          
        </table>
        <p style="font-weight: bold">N.B: --Account Offer Discount-- has already been deducted from the main price</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <p>&copy; 2024 Faster International Express. All rights reserved.</p>
      <p>HOUSE-19, ROAD-12, SECTOR-01, UTTARA, DHAKA-1230</p>
      <p>Email: <a href="mailto:faster.in.ex@gmail.com" style="color: white;">faster.in.ex@gmail.com</a></p>
      <p>Phone: <a href="tel:+8801577057714" style="color: white;">01577057714</a></p>
    </div>
  </div>
</body>
</html>`,
        };

        transporter
          .sendMail(message)
          .then((info) => {
            return res.status(200).json({
              message: "Order creation completed",
              status: 200,
              data: createNewOrder,
            });
          })
          .catch((err) => {
            
            return res.status(200).json({ msg: err, status: 400, data: [] });
          });
      } else {
        return res.status(200).json({
          message: "Provide parcel country data",
          status: 400,
          data: [],
        });
      }
    } else {
      return res.status(200).json({
        message: "Customer Not Found",
        status: 404,
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    
    return res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const updateOrderService = async (req, res) => {
  try {
    const trackID = req.params.trackID;
    const findOrder = await OrderModel.findOne({ trackId: trackID });
    const findTrack = await TrackModel.findOne({tracking_number: trackID})
    if (findOrder) {
      const { parcel,box } = req?.body;

      findOrder.parcel = parcel ?? findOrder.parcel;
      findOrder.box = box ?? findOrder.box 
      console.log(trackID);
      
      findTrack.own_tracking_info = {
        ...findTrack,
        box: box ?? findTrack.own_tracking_info.box
      }

      await findOrder.save();
      await findTrack.save();

      return res.status(200).json({
        message: "Order Updated Successfull",
        status: 200,
        data: [],
      });
    } else {
      return res.status(200).json({
        message: "Order Data Not Found",
        status: 404,
        data: [],
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const deleteOrderService = async (req, res) => {
  try {
    const trackID = req.params.trackID;

    const deleteOrder = await OrderModel.findOneAndDelete({trackId: trackID });
    const deleteTrack = await TrackModel.findOneAndDelete({
      tracking_number: trackID,
    });
    
    return res.status(200).json({
      message: "Order Delete Successfull",
      status: 200,
      data: [],
    });
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const paymentOrderService = async (req, res) => {
  try {
    const trackID = req.params.trackID;
    const findOrder = await OrderModel.findOne({ trackId: trackID });
    if (findOrder) {
      const { payment } = req?.body;

      findOrder.payment = payment ?? findOrder.payment;

      await findOrder.save();

      let transporter = nodemailer.createTransport(mailConfig.config);

      let message = {
        from: "finex.in.ex@gmail.com", // sender address
        to: findOrder?.parcel?.sender?.email, // list of receivers
        subject: `Order(ID:${findOrder?._id}) Invoice - Faster International Express`, // Subject line
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Completed - Faster International Express</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    
    body {
      font-family: 'Poppins', Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.1);
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
    .invoice-design {
      position: relative;
      margin-bottom: 20px;
    }
    .invoice-design .rotate-text {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%) rotate(-45deg);
      font-size: 40px;
      color: rgba(0, 0, 0, 0.1);
      font-weight: bold;
      text-align: center;
      width: 100%;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    table, th, td {
      border: 1px solid #dddddd;
      padding: 8px;
    }
    th {
      background-color: #f0f0f0;
    }
    .invoice-section {
      margin-top: 20px;
    }
    .invoice-section h2 {
      font-size: 18px;
      color: #2f3091;
      margin-top: 0;
      font-weight: 600;
    }
    .email-footer {
      padding: 20px;
      background-color: #2f3091;
      color: #ffffff;
      text-align: center;
      border-radius: 0 0 8px 8px;
    }
    .flex-container {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 20px;
    }
    .flex-container > div {
      flex: 1;
    }
    button {
      background-color: #2f3091;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    /* Responsive styles */
    @media (max-width: 600px) {
      .email-container {
        width: 100%;
      }
      .email-header h1 {
        font-size: 20px;
      }
      .invoice-design .rotate-text {
        font-size: 30px;
      }
      .flex-container {
        flex-direction: column;
      }
      .flex-container > div {
        width: 100%;
      }
      table, th, td {
        font-size: 14px;
        padding: 6px;
      }
      button {
        width: 100%;
        padding: 10px;
        font-size: 16px;
      }

      
    }

    @media (max-width: 400px) {
      .email-header h1 {
        font-size: 18px;
      }
      .email-body {
        font-size: 14px;
      }
    .rotate-text {
        font-size: 25px;
      }
      table, th, td {
        font-size: 12px;
        padding: 4px;
      }
      button {
        padding: 8px;
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Payment Completed - Faster International Express</h1>
    </div>
    <div class="email-body">
      <p>Hello ${findOrder?.parcel?.sender?.name},</p>
      <p>We are happy to inform you that your payment has been successfully completed. Below are the details of your transaction and order summary:</p>

      <!-- Invoice Section -->
      <div class="invoice-design">
        <div class="rotate-text" style="color: ${
                  (findOrder?.payment?.pAmount +
                    findOrder?.payment?.pExtraCharge -
                    findOrder?.payment?.pDiscount) -
                    findOrder?.payment?.pRecived ==
                  0
                    ? "green"
                    : "red"
                }">Payment ${
                  (findOrder?.payment?.pAmount +
                    findOrder?.payment?.pExtraCharge -
                    findOrder?.payment?.pDiscount) -
                    findOrder?.payment?.pRecived ==
                  0
                    ? "Completed"
                    : "Due"
                }</div>
        

        <!-- Charge Summary -->
        <h2>Charge Summary</h2>
        <table class="charge-summary">
          <thead>
            <tr><th>Total Amount</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>Weight Charge: ${findOrder?.payment?.pAmount}</div>
                <div>Extra Charge: ${findOrder?.payment?.pExtraCharge}</div>
                <div>Discount: ${findOrder?.payment?.pDiscount}</div>
                <div>Account Offer Discount: ${
                  findOrder?.payment?.pOfferDiscount
                }</div>
                <hr>
                <div>Total Charge: ${
                  findOrder?.payment?.pAmount +
                  findOrder?.payment?.pExtraCharge -
                  findOrder?.payment?.pDiscount
                }</div>
                <div>Total Charge Received: ${
                  findOrder?.payment?.pRecived
                }</div>
                 <div>Total Charge Due: ${
                   (findOrder?.payment?.pAmount +
                   findOrder?.payment?.pExtraCharge -
                   findOrder?.payment?.pDiscount) -
                   findOrder?.payment?.pRecived
                 }</div>
                <hr>
                <div>Payment Status: <strong style="color: green;"> ${
                  (findOrder?.payment?.pAmount +
                    findOrder?.payment?.pExtraCharge -
                    findOrder?.payment?.pDiscount) -
                    findOrder?.payment?.pRecived ==
                  0
                    ? "Completed"
                    : "Due"
                } </strong></div>
              </td>
            </tr>
          </tbody>
          
        </table>
        <p style="font-weight: bold">N.B: The account offer discount has already been deducted from the main price.</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <p>&copy; 2024 Faster International Express. All rights reserved.</p>
      <p>HOUSE-19, ROAD-12, SECTOR-01, UTTARA, DHAKA-1230</p>
      <p>Email: <a href="mailto:faster.in.ex@gmail.com" style="color: white;">faster.in.ex@gmail.com</a></p>
      <p>Contact: <a href="tel:+8801577057714" style="color: white;">01577057714</a></p>
    </div>
  </div>
</body>
</html>`,
      };

      transporter
        .sendMail(message)
        .then((info) => {
          return res.status(200).json({
            message: "Order Payment Complited",
            status: 200,
            data: [],
          });
        })
        .catch((err) => {
          return res.status(200).json({ msg: err, status: 400, data: [] });
        });
    } else {
      return res.status(200).json({
        message: "Order Data Not Found",
        status: 404,
        data: [],
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const userTotalOrderService = async (req, res) => {
  try {
    const phone = req?.params?.phone;

    const allOrder = await OrderModel.find();

    const findUserAllOrder = allOrder.filter(
      (sOrder) => sOrder?.customarPhone == phone
    );
    return res.status(200).json({
      message: "User All Order",
      status: 200,
      data: findUserAllOrder,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
 
module.exports = {
  allOrderService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
  userTotalOrderService,
  singleOrderService,
  paymentOrderService,
};
