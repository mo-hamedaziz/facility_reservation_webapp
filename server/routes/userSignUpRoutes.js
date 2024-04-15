const express = require("express");
const router = express.Router();
const userSignUpController = require("../controllers/userSignUpController");

// Utilisez la méthode post() avec une fonction de rappel
router.post("/signup", userSignUpController.signupUser);

module.exports = router;
