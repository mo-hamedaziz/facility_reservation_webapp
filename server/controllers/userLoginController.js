const President = require("../models/presidentsModel");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const userLogin = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    console.log(email);
    const president = await President.findOne({ email });

    if (!president) {
      return res.status(401).json({ message: "Invalid User" });
    }

    // Comparer le mot de passe fourni avec le mot de passe hashé dans la base de données
    if (password !== president.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(president._id);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userLogin;
