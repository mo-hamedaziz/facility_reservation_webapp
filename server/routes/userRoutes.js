const express = require("express");
const router = express.Router();
const extractUserFromToken = require("../middleware/auth.js");

const userLogin = require("../controllers/userLoginController");
const userSignup = require("../controllers/userSignUpController");
const profileController = require("../controllers/profileController");

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/profile", extractUserFromToken, profileController.getProfile);
router.patch("/profile", extractUserFromToken, profileController.updateProfile);

module.exports = router;
