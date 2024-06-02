const express = require ('express');
const {
    getAllBookingRequests,
    getSingleRequest,
    changeRequestStatus,
    getBookingRequestsCount // import the new controller
} = require('../controllers/bookingRequestsController');

// Create an instance of the express router
const router = express.Router();

// GET all booking requests
router.get('/list', getAllBookingRequests);

// GET single request details
router.get('/details', getSingleRequest);

// Approve or Deny request
router.patch('/details', changeRequestStatus);

// GET count of all booking requests
router.get('/count', getBookingRequestsCount); // add a new route for the new controller

module.exports = {bookingRequestRoutes:router};