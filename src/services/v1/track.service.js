const OrderModel = require("../../models/v1/Order.Model");
const TrackModel = require("../../models/v1/Track.Model");
const predictCourierCode = require("../../utils/predictCourierCode");
const trackIngApiConfig = require("../../config/trackingApiConfig");

const trackingData = {
  tracking_number: "",
  own_tracking_info: {
    weight: "",
    weight_kg: "",
    item: "",
    list: [],
    box: [],
    tracking_info: [
      {
        checkpoint_date: "MM-DD-YYYY",
        checkpoint_delivery_status: "pickup_bd",
        checkpoint_delivery_substatus: "pickup_bd",
        tracking_detail: "The parcel has been collected from the customer",
        location: "DHAKA",
        country_iso2: "",
        state: "DHAKA",
        city: "DHAKA",
        zip: "1230",
        raw_status: "",
      },
      {
        checkpoint_date: "MM-DD-YYYY",
        checkpoint_delivery_status: "pickup_bd",
        checkpoint_delivery_substatus: "pickup_bd",
        tracking_detail: "This shipment is now ready to go to the airport",
        location: "DHAKA",
        country_iso2: "",
        state: "DHAKA",
        city: "DHAKA",
        zip: "1230",
        raw_status: "",
      },
    ],
  },
  courier_tracking: [],
};

const allTrackService = async (req, res) => {
  try {
    const allTrackFromDB = await TrackModel.find();
    return res.status(200).json({
      message: "All Track Data",
      status: 200,
      data: allTrackFromDB,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const singleTrackService = async (req, res) => {
  try {
    const trackID = req.params.trackID;
    const findTrack = await TrackModel.findOne({ tracking_number: trackID });
    const findOrder = await OrderModel.findOne({ trackId: trackID });

    if (!findTrack && !findOrder) {
      const url = "https://api.trackingmore.com/v4/trackings/create";
      const data = {
        tracking_number: trackID,
        courier_code: predictCourierCode(trackID),
      };

      const options = {
        method: "POST",
        headers: trackIngApiConfig,
        body: JSON.stringify(data),
      };
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        const url = `https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${trackID}`;
        const options = {
          method: "GET",
          headers: trackIngApiConfig,
        };
        const response2 = await fetch(url, options);
        const response2Data = await response2.json();

        if (response2.ok) {
          return res.status(200).json({
            message: "Track Data",
            status: 200,
            data: {
              ...trackingData,
              courier_tracking: response2Data?.data,
              tracking_number: trackID,
              own_tracking_info: {
                ...trackingData.own_tracking_info,
                courier_tracking: response2Data?.data,
              },
            },
          });
        }

        if (!response2.ok) {
          return res.status(200).json({
            message: "Track Data Not Found",
            status: 200,
            data: [],
          });
        } else {
          return res.status(200).json({
            message: "Track Data",
            status: 200,
            data: {
              ...trackingData,
              courier_tracking: response2Data?.data,
              tracking_number: trackID,
              own_tracking_info: {
                ...trackingData.own_tracking_info,
                courier_tracking: response2Data?.data,
              },
            },
          });
        }
      }
    } else {
      const url = `https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${trackID}`;
      const options = {
        method: "GET",
        headers: trackIngApiConfig,
      };
      const response3 = await fetch(url, options);
      const response3Data = await response3.json();

      findTrack.own_tracking_info = {
        ...findTrack.own_tracking_info,
        courier_tracking: response3Data?.data,
      };

      const saveTrack = await findTrack.save();

      return res.status(200).json({
        message: "Track Data",
        status: 200,
        data: {
          track_info: saveTrack,
          order_info: findOrder,
        },
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
const createTrackService = async (req, res) => {
  try {
    const trackID = req.params.trackID;

    const handover_by_company = req?.body?.handover_by_company ?? false;
    const handover_by_tracking = req?.body?.handover_by_tracking ?? false;
    const handover_by_payment = req?.body?.handover_by_payment ?? false;
    const track_update = req?.body?.track_update ?? false;

    const findTrack = await TrackModel.findOne({ tracking_number: trackID });
    const findOrder = await OrderModel.findOne({ trackId: trackID });

    if (!handover_by_company && !handover_by_tracking && !handover_by_payment) {
      return res.status(200).json({
        message: "plz send valid data",
        status: 400,
        data: [],
      });
    }
    if (findTrack && findOrder) {
      findTrack.tracking_number = handover_by_tracking;
      findOrder.handover_by = {
        company: handover_by_company,
        traking: handover_by_tracking,
        payment: handover_by_payment,
      };
      findOrder.trackId = handover_by_tracking;

      const url = "https://api.trackingmore.com/v4/trackings/create";
      const data = {
        tracking_number: handover_by_tracking,
        courier_code: handover_by_company,
      };

      const options = {
        method: "POST",
        headers: trackIngApiConfig,
        body: JSON.stringify(data), // Convert the data object to a JSON string
      };
      const responseData = await fetch(url, options);
      const response = await responseData.json();

      if (response.meta.code == 4101 && track_update) {
        const url = `https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${trackID}`;
        const options = {
          method: "GET",
          headers: trackIngApiConfig,
        };

        const response2 = await fetch(url, options);
        const response2Data = await response2.json();
        if (!response2Data.ok) {
          findTrack.own_tracking_info = {
            ...findTrack.own_tracking_info,
            courier_tracking: response2Data?.data,
          };

          const saveOrder = await findOrder.save();
          const saveTrack = await findTrack.save();

          return res.status(200).json({
            message: "saved Track Data",
            status: 200,
            data: [],
          });
        } else {
          return res.status(200).json({
            message: "alrady exists.",
            status: 200,
            data: [],
          });
        }
      } else {
        const saveOrder = await findOrder.save();

        findTrack.own_tracking_info = {
          ...findTrack.own_tracking_info,
          courier_tracking: response?.data,
        };

        const saveTrack = await findTrack.save();

        return res.status(200).json({
          message: "saved Track Data",
          status: 200,
          data: [],
        });
      }
    } else {
      return res.status(200).json({
        message: "Track Details History Not Found",
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
const deleteTrackService = async (req, res) => {
  try {
    const trackID = req.params.trackID;
    const deleteTrack = await TrackModel.findOneAndDelete({
      tracking_number: trackID,
    });

    return res.status(200).json({
      message: "Track Delete Successfull",
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

module.exports = {
  allTrackService,
  singleTrackService,
  createTrackService,
  deleteTrackService,
};
