const express = require("express");
const router = express.Router();
const userLoginController = require("../controllers/userLoginController");

router.post("/login", userLoginController.loginUser);

module.exports = router;
