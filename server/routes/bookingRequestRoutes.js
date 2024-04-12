const express = require ('express');
const {
    getAllBookingRequests,
    getSingleRequest,
    changeRequestStatus
} = require('../controllers/bookingRequestsController');

// Create an instance of the express router
const router = express.Router();

// GET all booking requests
router.get('/list', getAllBookingRequests);
router.get('/details', getSingleRequest);
router.patch('/details', changeRequestStatus);

module.exports = {bookingRequestRoutes:router};