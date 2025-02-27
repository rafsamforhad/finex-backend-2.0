const TrackModel = require("../../models/v1/Track.Model");

const createTracking = async (trackId, parcel, box) => {
  const newTracking = new TrackModel({
    tracking_number: trackId,
    own_tracking_info: {
      weight: parcel?.weight,
      weight_kg: parcel?.weight,
      item: parcel?.item?.type,
      list: parcel?.item?.list,
      box: box,

      tracking_info: [
        {
          checkpoint_date: new Date(),
          checkpoint_delivery_status: "pickup_bd",
          checkpoint_delivery_substatus: "pickup_bd",
          tracking_detail: "The parcel has been collected from the customer",
          location: "DHAKA",
          country_iso2: null,
          state: "DHAKA",
          city: "DHAKA",
          zip: "1230",
          raw_status: null,
        },
        {
          checkpoint_date: new Date(),
          checkpoint_delivery_status: "pickup_bd",
          checkpoint_delivery_substatus: "pickup_bd",
          tracking_detail: "This shipment is now ready to go to the airport",
          location: "DHAKA",
          country_iso2: null,
          state: "DHAKA",
          city: "DHAKA",
          zip: "1230",
          raw_status: null,
        },
      ],
    },
  });

  const createNewTracking = await newTracking.save();

  return createNewTracking;
};

module.exports = {
  createTracking,
};
