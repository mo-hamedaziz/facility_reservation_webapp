const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// Route pour récupérer le profil de l'utilisateur
router.get("/profile", profileController.getProfile);

// Route pour mettre à jour le profil de l'utilisateur
router.put("/profile", profileController.updateProfile);

module.exports = router;
