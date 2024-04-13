require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const {bookingRequestRoutes} = require ('./routes/bookingRequestRoutes');
const {presidentsRoutes} = require ('./routes/presidentsRoutes');

const port = process.env.PORT;

const app = express();

// Using middleware
app.use(
    cors({
      origin: process.env.REACT_APP_BASE_URL,
      methods: ["GET", "POST", "DELETE", "PATCH"],
    })
  );
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
// Booking Requests Routes
app.use("/api/booking/request", bookingRequestRoutes);

// Presidents Routes
app.use("/api/users/president", presidentsRoutes);

// Connect to DB
console.log('Connecting to the database ...');
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(port, () => {
            console.log(`Connected to the Database\nListening on port: ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
