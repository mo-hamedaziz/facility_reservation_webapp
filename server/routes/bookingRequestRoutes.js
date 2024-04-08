const express = require ('express');
const {
    getAllBookingRequests
} = require('../controllers/bookingRequestsController');

// Create an instance of the express router
const router = express.Router();

// GET all booking requests
router.get('/list', getAllBookingRequests);

module.exports = {bookingRequestRoutes:router};