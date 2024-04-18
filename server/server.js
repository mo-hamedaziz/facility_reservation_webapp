const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRequestRoutes = require('./routes/booking'); // Corrected path for booking routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://mohamedazizbchini:JAft4YbHmrP2zoVb@mernapp.ob6uqv9.mongodb.net/Facility_Reservation_DB?retryWrites=true&w=majority&appName=MERNapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/booking-requests', bookingRequestRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
