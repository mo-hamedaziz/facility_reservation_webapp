const express = require("express");
const router = express.Router();

const userLogin = require("../controllers/userLoginController");
const userSignup = require("../controllers/userSignUpController");

router.post("/login", userLogin);
router.post("/signup", userSignup);

module.exports = router;
