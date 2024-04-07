require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/dashboardRoutes");

const port = process.env.PORT;

const app = express();

// Using middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Dashboard Routes
app.use('/dashboard',workoutRoutes);

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
