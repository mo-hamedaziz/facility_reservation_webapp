const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PresidentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clubName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const AdminSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ClassroomSchema = new Schema({
    name: { 
        type: String,
        required: true 
    }
},{ timestamps: true });

const SignupRequestSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    clubName: {
        type: String,
        required: true
    },
    startOfMandate: {
        type: Date,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps:true});

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

module.exports = {
    President: mongoose.model('President', PresidentSchema),
    Admin: mongoose.model('Admin', AdminSchema),
    Classroom: mongoose.model('Classroom', ClassroomSchema),
    SignupRequest: mongoose.model('SignupRequest', SignupRequestSchema),
    Event: mongoose.model('Event', EventSchema),
    BookingRequest: mongoose.model('BookingRequest', BookingRequestSchema)
};