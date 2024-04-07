president {
    id
    firstName
    lastName
    cin
    phoneNumber
    email (typed in the singup form)
    password (randomly generated)
    clubName
}

admin {
    id
    firstName
    lastName
    cin
    phoneNumber
    email (typed by the superuser)
    password (typed by the superuser)
}

classroom {
    id
    name
}

signup_request{
    id
    firstName
    lastName
    clubName
    startOfMandate (date format)
    cin
    phoneNumber
    email
    submissionTime
    status
}

event{
    id
    name
    type
    date
    time
    number_of_participants
    description
}

booking_request{
    id
    event (refKey -> event Table)
    sender (refKey -> president Table)
    requested_classroom (refKey -> classrom Table)
    logistics
    comment
    attachment (link to the attachment in the FTP server)
    submissionTime
    responseTime
    status
}

___________________________________________________________
import mongoose from 'mongoose';

const PresidentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cin: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    clubName: { type: String, required: true },
});

const AdminSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cin: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const ClassroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const SignupRequestSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    clubName: { type: String, required: true },
    startOfMandate: { type: Date, required: true },
    cin: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    submissionTime: { type: Date, required: true },
    status: { type: String, required: true },
});

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    number_of_participants: { type: Number, required: true },
    description: { type: String, required: true },
});

const BookingRequestSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'President', required: true },
    requested_classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
    logistics: { type: String, required: true },
    comment: { type: String, required: true },
    attachment: { type: String, required: true },
    submissionTime: { type: Date, required: true },
    responseTime: { type: Date, required: true },
    status: { type: String, required: true },
});

export const President = mongoose.model('President', PresidentSchema);
export const Admin = mongoose.model('Admin', AdminSchema);
export const Classroom = mongoose.model('Classroom', ClassroomSchema);
export const SignupRequest = mongoose.model('SignupRequest', SignupRequestSchema);
export const Event = mongoose.model('Event', EventSchema);
export const BookingRequest = mongoose.model('BookingRequest', BookingRequestSchema);
