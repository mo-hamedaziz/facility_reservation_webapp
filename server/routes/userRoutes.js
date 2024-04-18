const express = require("express");
const router = express.Router();

const userLogin = require("../controllers/userLoginController");
const userSignup = require("../controllers/userSignUpController");
const profileController = require("../controllers/profileController");

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/profile", profileController.getProfile);
router.put("/profile", profileController.updateProfile);

module.exports = router;
