const Profile = require("../models/presidentsModel");

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Envoyer les données du profil au client
    res
      .status(200)
      .json({ message: "Profile retrieved successfully", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  const updates = req.body;

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.user,
      updates,
      { new: true } // Retourner le document mis à jour
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Envoyer le profil mis à jour au client
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProfile, updateProfile };
