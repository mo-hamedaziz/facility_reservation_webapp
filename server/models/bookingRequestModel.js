const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingRequestSchema = new Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'President',
        required: true
    },
    requested_classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    logistics: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
        required: true
    },
    submissionTime: {
        type: Date,
        required: true
    },
    responseTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, {timestamps:true});

module.exports =mongoose.model('BookingRequest', BookingRequestSchema);