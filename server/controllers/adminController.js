const Admin = require('../models/adminsModel');

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).sort({ firstName: 1, lastName: 1 });
    res.status(200).json(admins);
  } catch (error) {
    handleServerError(res, error, "Error fetching admins");
  }
};

// Get single admin by ID
const getSingleAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.query.id);
    if (!admin) {
      return res
        .status(404)
        .json({ error: "This admin CANNOT BE FOUND on the server!" });
    }
    res.status(200).json(admin);
  } catch (error) {
    handleServerError(res, error, "Error fetching this admin's details");
  }
};

// Delete an admin
const deleteSingleAdmin = async (req, res) => {
  const adminId = req.query.id;

  try {
    // Delete the admin
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Send a success response
    return res.status(200).json({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    // Handle errors
    console.error("Error deleting admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Add an admin after approving the signup request
const addAdmin = async (req, res) => {
  try {
    const { firstName, lastName, cin, phoneNumber, email, password } = req.body;

    const newAdmin = new Admin({
      firstName,
      lastName,
      cin,
      phoneNumber,
      email,
      password,
    });

    const savedAdmin = await newAdmin.save();

    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get count of all admins
const getAdminsCount = async (req, res) => {
  try {
    const count = await Admin.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching admins count:", error);
    res.status(500).json({ error: error.toString() });
  }
};

// Handle server errors
const handleServerError = (res, error) => {
  console.error("Internal Server Error:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = {
  getAllAdmins,
  getSingleAdmin,
  deleteSingleAdmin,
  addAdmin,
  getAdminsCount,
};