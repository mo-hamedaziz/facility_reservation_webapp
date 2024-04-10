const BookingRequest = require("../models/bookingRequestModel");
const Classroom = require ("../models/classroomsModel");

// Get all booking requests
const getAllBookingRequests = async (req, res) => {
    try {
        let filter = {};
        // Check if 'show' query parameter exists and apply filtering
        if (req.query.show === 'pending' || req.query.show === 'denied' || req.query.show === 'approved') {
            filter = { status: req.query.show.charAt(0).toUpperCase() + req.query.show.slice(1) }; // Capitalize first letter
        }
        // Populate the _event field
        const requests = await BookingRequest.find(filter).populate(['_event','_sender','_requested_classroom']).sort({ createdAt: -1 });
        const locations= await Classroom.find({}).sort({ name: 1 });
        
        // Send the populated requests as response
        res.status(200).json({ requests, locations });
        //console.log(res.data);
    } catch (err) {
        // Handle errors
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllBookingRequests
};
