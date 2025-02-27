const ContactModel = require("../../models/v1/Contact.Model");
const CountryModel = require("../../models/v1/Country.Model");
const FeedbackModel = require("../../models/v1/Feedback.Model");
const VisitorModel = require("../../models/v1/Visitor.Model");

const allCountryService = async (req, res) => {
  try {
    const countries = await CountryModel.find(); // Fetch all country records
    return res.status(200).json({
      message: "Countries fetched successfully",
      status: 200,
      data: countries,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const createCountryService = async (req, res) => {
  const { name } = req.body; // Extract data from req.body

  try {
    const newCountry = new CountryModel({ name }); // Create new country instance
    const savedCountry = await newCountry.save();
    return res.status(201).json({
      message: "Country created successfully",
      status: 200,
      data: savedCountry,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const singleCountryService = async (req, res) => {
  try {
    const country = await CountryModel.findById({ _id: req.params.id }); // Find country by ID
    if (!country) {
      return res.status(404).json({
        message: "Country not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Country fetched successfully",
      status: 200,
      data: country,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const updateCountryService = async (req, res) => {
  const { name } = req.body; // Extract data from req.body

  try {
    const updatedCountry = await CountryModel.findByIdAndUpdate(
      { _id: req.params.id },
      { name }, // Update the country name
      { new: true } // Return the updated document
    );
    if (!updatedCountry) {
      return res.status(404).json({
        message: "Country not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Country updated successfully",
      status: 200,
      data: updatedCountry,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};
const deleteCountryService = async (req, res) => {
  try {
    const deletedCountry = await CountryModel.findByIdAndDelete({
      _id: req.params.id,
    }); // Delete country by ID
    if (!deletedCountry) {
      return res.status(404).json({
        message: "Country not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Country deleted successfully",
      status: 200,
      data: deletedCountry,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error in service",
      status: 400,
      data: [],
    });
  }
};

const allFeedbackService = async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find(); // Fetch all feedback entries
    return res.status(200).json({
      message: "Feedbacks fetched successfully",
      status: 200,
      data: feedbacks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
};
const createFeedbackService = async (req, res) => {
  try {
    const phone = req?.params?.phone;

    const { rating, content, name ,profile} = req.body;
    const newFeedback = new FeedbackModel({
      name,
      phone,
      rating,
      content,
      profile,
      updatedAt: new Date(),
    });

    const savedFeedback = await newFeedback.save(); // Save feedback to the database
    return res.status(200).json({
      message: "Feedback created successfully",
      status: 200,
      data: savedFeedback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
};
const singleFeedbackService = async (req, res) => {
  try {
    const feedback = await FeedbackModel.findOne({ phone: req.params.phone }); // Find feedback by phone

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Feedback fetched successfully",
      status: 200,
      data: feedback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
};
const updateFeedbackService = async (req, res) => {
  const { rating, content, isApproved } = req.body;
console.log(req.body);

  try {
    const updatedFeedback = await FeedbackModel.findOneAndUpdate(
      { _id: req.params.id },
      { rating, content ,isApproved},
      { new: true } // Return the updated document
    );

    if (!updatedFeedback) {
      return res.status(404).json({
        message: "Feedback not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Feedback updated successfully",
      status: 200,
      data: updatedFeedback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
};
const deleteFeedbackService = async (req, res) => {
  try {
    const deletedFeedback = await FeedbackModel.findOneAndDelete({
      phone: req.params.phone,
    });

    if (!deletedFeedback) {
      return res.status(404).json({
        message: "Feedback not found",
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Feedback deleted successfully",
      status: 200,
      data: deletedFeedback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
};

const allContactService = async (req, res) => {
  try {
    const contacts = await ContactModel.find(); // Fetch all contacts
    return res.status(200).json({
      message: "Contacts fetched successfully",
      status: 200,
      data: contacts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in service",
      status: 500,
      data: [],
    });
  }
};
const singleContactService = async (req, res) => {
  try {
    console.log(req?.params?.id);
    const contact = await ContactModel.findOne({ _id: req?.params?.id }); // Find contact by ID
    console.log(contact);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Contact fetched successfully",
      status: 200,
      data: contact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const createContactService = async (req, res) => {
  const { name, phone, email, message } = req.body; // Extract data from req.body

  try {
    const newContact = new ContactModel({
      name,
      phone,
      email,
      message,
    }); // Create new contact instance
    const savedContact = await newContact.save();
    return res.status(200).json({
      message: "Contact created successfully",
      status: 200,
      data: savedContact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const updateContactService = async (req, res) => {
  const { name, phone, email, message, status, message2 } = req.body; // Extract data from req.body

  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      { _id: req.params.id },
      { name, phone, email, message, status, message2 }, // Use extracted data
      { new: true } // Return the updated document
    );
    if (!updatedContact) {
      return res.status(404).json({
        message: "Contact not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Contact updated successfully",
      status: 200,
      data: updatedContact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};
const deleteContactService = async (req, res) => {
  try {
    const deletedContact = await ContactModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Contact deleted successfully",
      status: 200,
      data: deletedContact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in Service",
      status: 500,
      error: error.message,
    });
  }
};

const allVisitorService = async (req, res) => {
  try {
    const visitors = await VisitorModel.find({});
    res.status(200).json({
      message: "All visitors fetched successfully",
      status: 200,
      data: visitors,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching visitors", error });
  }
};
const createVisitorService = async (req, res) => {
  const { isDone, name, phone, email, type, service } = req.body;
  try {
    const newVisitor = new VisitorModel({
      isDone,
      name,
      phone,
      email,
      type,
      service,
    });
    await newVisitor.save();
    res.status(200).json({
      message: "Successfully Seved Data",
      status: 200,
      data: newVisitor,
    });
  } catch (error) {
    res.status(200).json({
      message: "Error creating visitor",
      status: 500,
      error: error.message,
    });
  }
};
const singleVisitorService = async (req, res) => {
  const { id } = req.params;
  try {
    const visitor = await VisitorModel.findById(id);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res
      .status(200)
      .json({ status: 200, message: "Single Visitor", data: visitor });
  } catch (error) {
    res.status(500).json({ message: "Error fetching visitor", error });
  }
};
const updateVisitorService = async (req, res) => {
  const { id } = req.params;
  const { isDone, name, phone, email, type, service, message } = req.body;
  try {
    const updatedVisitor = await VisitorModel.findByIdAndUpdate(
      id,
      { isDone, name, phone, email, type, service, message },
      { new: true }
    );
    if (!updatedVisitor) {
      return res
        .status(200)
        .json({ status: 404, data: [], message: "Visitor not found" });
    }
    res
      .status(200)
      .json({
        status: 200,
        data: updatedVisitor,
        message: "update visitor data",
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating visitor", error });
  }
};
const deleteVisitorService = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVisitor = await VisitorModel.findByIdAndDelete(id);
    if (!deletedVisitor) {
      return res
        .status(200)
        .json({ message: "Visitor not found", status: 404, data: [] });
    }
    res
      .status(200)
      .json({ message: "Visitor deleted successfully", status: 200, data: [] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting visitor", error });
  }
};

module.exports = {
  allCountryService,
  createCountryService,
  singleCountryService,
  updateCountryService,
  deleteCountryService,

  allFeedbackService,
  createFeedbackService,
  singleFeedbackService,
  updateFeedbackService,
  deleteFeedbackService,

  allContactService,
  createContactService,
  singleContactService,
  updateContactService,
  deleteContactService,

  allVisitorService,
  createVisitorService,
  singleVisitorService,
  updateVisitorService,
  deleteVisitorService,
};
