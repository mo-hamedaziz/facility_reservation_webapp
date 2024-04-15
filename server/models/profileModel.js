const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  cin: String,
  profilePicture: String,
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
