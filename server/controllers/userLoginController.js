const bcrypt = require("bcrypt");
const President = require("../models/presidentsModel");

userLogin = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    console.log(email);
    // Vérifier si l'utilisateur existe dans la base de données
    const president = await President.findOne({ email });

    if (!president) {
      return res.status(401).json({ message: "Invalid User" });
    }

    // Comparer les mots de passe
    const passwordMatch = await bcrypt.compare(password, president.password);

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
