const bcrypt = require("bcrypt");
const President = require("../models/presidentsModel");
const BookingRequest = require("../models/bookingRequestModel");

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

    const generatedPassword = generateRandomPassword(12);
    console.log(generatedPassword);
    // const password = req.body.password; // Extract password from req.body

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create a new instance of President model with provided data
    const newPresident = new President({
      firstName,
      lastName,
      cin,
      phoneNumber,
      email,
      password: hashedPassword, // Store the hashed password in the database
      clubName,
    });

    // Save the new president to the database
    const savedPresident = await newPresident.save();

    res.status(201).json(savedPresident); // Respond with the saved president
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle any errors
  }
};

// Handle server errors
const handleServerError = (res, error) => {
  console.error("Internal Server Error:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

// Define a function to generate a random password
function generateRandomPassword(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
  }
  return password;
}

module.exports = {
  getAllPresidents,
  getSinglePresident,
  deleteSinglePresident,
  addPresident,
};
