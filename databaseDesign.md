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

