const TemporaryUser = require("../models/temporaryUserModel");

userSignup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    cin,
    clubName,
    startMandate,
  } = req.body;

  try {
    // Créer un nouvel utilisateur
    const newUser = new TemporaryUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      cin,
      clubName,
      startMandate,
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
