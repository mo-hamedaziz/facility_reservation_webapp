const Profile = require("../models/profileModel");

exports.getProfile = async (req, res) => {
  try {
    // Récupérer le profil de l'utilisateur actuellement connecté à partir de la demande (req)
    // Supposons que vous ayez stocké l'ID de l'utilisateur dans le jeton JWT, vous pouvez l'utiliser pour trouver le profil correspondant dans la base de données
    const profile = await Profile.findOne({ userId: req.user._id });

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

exports.updateProfile = async (req, res) => {
  const updates = req.body;

  try {
    // Mettre à jour le profil de l'utilisateur actuellement connecté avec les nouvelles données
    // Supposons que vous ayez stocké l'ID de l'utilisateur dans le jeton JWT, vous pouvez l'utiliser pour trouver le profil correspondant dans la base de données
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.user._id },
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
