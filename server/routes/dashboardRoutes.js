const express = require ('express');
const {
    showPresidentDashboard,
    showAdminDashboard
} = require("../controllers/dashboardController");

// Create an instance of the express router
const router = express.Router();

// President's dash
router.get('/president', showPresidentDashboard);

// Admin's dash
router.get('/admin', showAdminDashboard);


module.exports = router;