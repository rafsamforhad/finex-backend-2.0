const PickupModel = require("../../models/v1/Pickup.Model");
const UserModel = require("../../models/v1/User.Model");

// Fetch all pickups
const allUserPickupService = async (req, res) => {
  try {
    const pickups = (await PickupModel.find()).reverse(); // Fetch all pickup records
    res.status(200).json({
      message: "Pickups fetched successfully",
      status: 200,
      data: pickups,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
// Fetch a single pickup by ID
const singlePickupService = async (req, res) => {
  try {
    const pickup = await PickupModel.findById(req.params.id); // Fetch a pickup by ID
    if (!pickup) {
      return res.status(404).json({
        message: "Pickup not found",
        status: 404,
      });
    }
    res.status(200).json({
      message: "Pickup fetched successfully",
      status: 200,
      data: pickup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
// Create a new pickup
const createPickupService = async (req, res) => {
  try {
    const {
      phone,
      parcel: { weight, item },
      address: { region, city, area, address },
      pickupTime,
    } = req.body; // Destructure the required properties from req.body
    const userFind = await UserModel.findOne({ phone: phone });

    if (userFind) {
      const newPickup = new PickupModel({
        phone,
        profile: userFind.profile,
        name: userFind.name,
        parcel: {
          weight,
          item,
        },
        address: {
          region,
          city,
          area,
          address,
        },
        pickupTime,
        isAccepted:{
          phone:"",
          status:"Created",
          confirm:false,
          staffCost:0
        }
      }); // Create a new pickup instance
      const savedPickup = await newPickup.save(); // Save to the database
      res.status(200).json({
        message: "Pickup created successfully",
        status: 200,
        data: savedPickup,
      });
    } else {
      res.status(200).json({
        message: "User Not Found",
        status: 404,
        error: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    
    res.status(200).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
// Update an existing pickup by ID
const updatePickupService = async (req, res) => {
  try {
    const {
      parcel: { weight, item },
      address: { region, city, area, address },
      pickupTime,
      isAccepted: { phone: acceptedPhone, confirm, staffCost, status },
    } = req.body; // Destructure the required properties from req.body

    const updatedPickup = await PickupModel.findByIdAndUpdate(
      req.params.id,
      {
        parcel: {
          weight,
          item,
        },
        address: {
          region,
          city,
          area,
          address,
        },
        pickupTime,
        isAccepted: {
          phone: acceptedPhone,
          confirm,
          staffCost,
          status,
        },
      },
      { new: true }
    ); // Update and return the new pickup

    if (!updatedPickup) {
      return res.status(404).json({
        message: "Pickup not found",
        status: 404,
      });
    }

    res.status(200).json({
      message: "Pickup updated successfully",
      status: 200,
      data: updatedPickup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
// Delete a pickup by ID
const deletePickupService = async (req, res) => {
  try {
    const deletedPickup = await PickupModel.findByIdAndDelete(req.params.id); // Delete the pickup
    if (!deletedPickup) {
      return res.status(404).json({
        message: "Pickup not found",
        status: 404,
      });
    }
    res.status(200).json({
      message: "Pickup deleted successfully",
      status: 200,
      data: deletedPickup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
// Delete a pickup by ID
const requestAcceptedByStaffService = async (req, res) => {
  try {
    // Destructure the required properties from req.body
    const { phone, confirm, staffCost, status } = req.body; // Assuming these are the properties to update

    // Find the pickup by ID
    const pickupId = req.params.id; // Get the pickup ID from the request parameters

    // Update the isAccepted object in the Pickup model
    const updatedPickup = await PickupModel.findByIdAndUpdate(
      pickupId,
      {
        isAccepted: {
          phone, // Update phone
          confirm, // Update confirmation status
          staffCost, // Update staff cost
          status,
        },
      },
      { new: true } // Return the updated document
    );

    // Check if the pickup was found and updated
    if (!updatedPickup) {
      return res.status(404).json({
        message: "Pickup not found",
        status: 404,
      });
    }

    // Respond with the updated pickup
    res.status(200).json({
      message: "Pickup request accepted by staff successfully",
      status: 200,
      data: updatedPickup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  allUserPickupService,
  singlePickupService,
  createPickupService,
  updatePickupService,
  deletePickupService,
  requestAcceptedByStaffService,
};
