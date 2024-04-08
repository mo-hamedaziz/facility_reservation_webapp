const mongoose = require('mongoose');
//const model = require("../models/Model");

// Get president's dash
const showPresidentDashboard = async (req, res) => {
    res.status(200).json({msg: 'This is the president dashboard'});
}

// Get admin's dash
const showAdminDashboard = async (req, res) => {
    res.status(200).json({msg: 'This is the admin dashboard'});
}

module.exports = {
    showPresidentDashboard,
    showAdminDashboard
}