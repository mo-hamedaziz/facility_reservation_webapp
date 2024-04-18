const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    number_of_participants: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {timestamps:true});

module.exports = mongoose.model('Event', EventSchema);