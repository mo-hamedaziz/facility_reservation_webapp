const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["clubPresident", "admin"],
    default: "clubPresident",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
