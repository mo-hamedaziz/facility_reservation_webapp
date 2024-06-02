const Classroom = require('../models/classroom.js');
const BookingRequest = require('../models/bookingRequest.js');


const bookingController = {
  step1: async (req, res) => {
    try {
      const { selectedClassroom } = req.body;
      // You can add validation here if necessary
      res.json({ success: true, selectedClassroom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  step2: async (req, res) => {
    try {
      const { selectedDate, selectedTime } = req.body;
      // You can add validation here if necessary
      res.json({ success: true, selectedDate, selectedTime });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  step3: async (req, res) => {
    try {
      // Assuming form data is sent as multipart/form-data
      const { eventType, eventName, eventDescription, logistics, participants, comment, file } = req.body;
      const { selectedClassroom, selectedDate, selectedTime } = req.body; // Assuming these are already stored or fetched from previous steps
      const eventId = req.body.eventId; 
      
      // Save booking request to database
      const bookingRequest = new BookingRequest({
        event: eventId, // Assuming eventId is fetched from frontend
        requested_classroom: selectedClassroom,
        logistics,
        comment,
        attachment: file ? file.path : null, // Assuming file is uploaded and stored
        submissionTime: new Date(),
        responseTime: null,
        status: 'Pending',
      });
      await bookingRequest.save();

      res.json({ success: true, message: 'Booking request submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = bookingController;