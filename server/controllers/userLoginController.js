const President = require("../models/presidentsModel");
const Admin = require("../models/adminsModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //console.log(email);
    const president = await President.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!president && !admin) {
      return res.status(401).json({ message: "Invalid User" });
    }

    let passwordMatch;
    if (president) {
      passwordMatch = await bcrypt.compare(password, president.password);
    } else if (admin) {
      passwordMatch = password === admin.password; // Plaintext comparison for admin
    }

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userId = president ? president._id : admin._id;
    const token = generateToken(userId);

    return res
      .status(200)
      .json({ message: "Login successful", token, isAdmin: !!admin, userId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userLogin;
