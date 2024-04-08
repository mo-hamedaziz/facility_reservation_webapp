const BookingRequest = require("../models/bookingRequestModel");
const mongoose = require("mongoose");

// Get all booking requests
const getAllBookingRequests = async (req, res) => {
    try {
        // Populate the _event field
        const requests = await BookingRequest.find({}).populate(['_event','_sender','_requested_classroom']).sort({ createdAt: -1 });
        // Send the populated requests as response
        res.status(200).json(requests);
    } catch (err) {
        // Handle errors
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllBookingRequests
};
