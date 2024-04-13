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

// GET single request details
router.get('/details', getSingleRequest);

// Approve or Deny request
router.patch('/details', changeRequestStatus);

module.exports = {bookingRequestRoutes:router};