const mongoose = require('mongoose');

const BookingRequestSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: false },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'President', required: false },
    requested_classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: false },
    logistics: { type: String, required: false },
    comment: { type: String, required: false },
    attachment: { type: String, required: false },
    submissionTime: { type: Date, required: false },
    responseTime: { type: Date, required: false },
    status: { type: String, required: false },
});

const BookingRequest = mongoose.model('BookingRequest', BookingRequestSchema);

// Export the BookingRequest model
module.exports = BookingRequest;