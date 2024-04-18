const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SignupRequestSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    clubName: {
      type: String,
      required: true,
    },
    startOfMandate: {
      type: Date,
      required: true,
    },
    cin: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SignupRequest", SignupRequestSchema);
