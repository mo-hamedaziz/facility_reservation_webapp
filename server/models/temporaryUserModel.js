const mongoose = require("mongoose");

const temporaryUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
    unique: true,
  },
  clubName: {
    type: String,
    required: true,
  },
  startMandate: {
    type: Date,
    required: true,
  },
});

const TemporaryUser = mongoose.model("TemporaryUser", temporaryUserSchema);

module.exports = TemporaryUser;
