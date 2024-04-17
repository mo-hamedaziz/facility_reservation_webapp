const bcrypt = require("bcrypt");
const User = require("../models/userModel");

userLogin = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const user = await User.findOne({ email, userType });

    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }

    // Comparer les mots de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Retourner un message de succès
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userLogin;
