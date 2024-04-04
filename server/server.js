require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT;

const app = express();

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
