const bcrypt = require("bcrypt");

const President = require("../models/presidentsModel");
const BookingRequest = require("../models/bookingRequestModel");

const sendEmail = require("../utils/nodeMailerAPI");
const {
  generateRandomPassword,
  passwordEmailBody
} = require("../utils/passwordOperations");

// Get all presidents
const getAllPresidents = async (req, res) => {
  try {
    const presidents = await President.find({}).sort({ name: 1 });
    res.status(200).json(presidents);
  } catch (error) {
    handleServerError(res, error, "Error fetching presidents");
  }
};

// Get single president by ID
const getSinglePresident = async (req, res) => {
  try {
    const president = await President.findById(req.query.id);
    if (!president) {
      return res
        .status(404)
        .json({ error: "This president CANNOT BE FOUND on the server!" });
    }
    res.status(200).json(president);
  } catch (error) {
    handleServerError(res, error, "Error fetching this president's details");
  }
};

// Delete a president
const deleteSinglePresident = async (req, res) => {
  const presidentId = req.query.id;

  try {
    // Delete all booking requests sent by the president
    const deletedRequests = await BookingRequest.deleteMany({
      sender: presidentId,
    });

    // Delete the president
    const deletedPresident = await President.findByIdAndDelete(presidentId);

    if (!deletedPresident) {
      return res.status(404).json({ error: "President not found" });
    }

    // Send a success response
    return res.status(200).json({
      message: "President and associated requests deleted successfully",
    });
  } catch (error) {
    // Handle errors
    console.error("Error deleting president:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Add a president after approving the signup request
const addPresident = async (req, res) => {
  try {
    const { firstName, lastName, cin, phoneNumber, email, clubName } = req.body;
    const generatedPassword = generateRandomPassword(20);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newPresident = new President({
      firstName,
      lastName,
      cin,
      phoneNumber,
      email,
      password: hashedPassword,
      clubName,
    });

    const passwordEmail = await sendEmail(
      "Facility Reservation App",
      "mohamedaziz0801@gmail.com",
      newPresident.email,
      "Your Reservation App Password",
      passwordEmailBody(generatedPassword)
    );

    if (!passwordEmail) {
      console.log("Sending password email has failed :(");
      return res.status(500).json({ error: "Failed to send password email" });
    }

    const savedPresident = await newPresident.save();

    res.status(201).json(savedPresident);
  } catch (error) {
    console.error("Error adding president:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get count of all presidents
const getPresidentsCount = async (req, res) => {
  try {
    const count = await President.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching presidents count:", error);
    res.status(500).json({ error: error.message });
  }
};

// Handle server errors
const handleServerError = (res, error) => {
  console.error("Internal Server Error:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = {
  getAllPresidents,
  getSinglePresident,
  deleteSinglePresident,
  addPresident,
  getPresidentsCount, // export the new controller
};