const SignupRequest = require("../models/signupRequestsModel");
const President = require("../models/presidentsModel");

userSignup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    cin,
    clubName,
    startOfMandate,
  } = req.body;

  try {
    const existingPresident = await President.findOne({ email });

    if (existingPresident) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingClub = await President.findOne({ clubName });
    if (existingClub) {
      return res.status(400).json({ message: "Club name already in use" });
    }
    const newUser = new SignupRequest({
      firstName,
      lastName,
      email,
      phoneNumber,
      cin,
      clubName,
      startOfMandate,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signup request received. Waiting for admin approval.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userSignup;
