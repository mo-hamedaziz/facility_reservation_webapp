import React, { useState, useEffect } from "react";
import defaultProfilePicture from "./assets/user.png"; // Importez votre image par défaut
import axios from "axios";

import "./ProfilePage.css";

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cin: "",
    profilePicture: defaultProfilePicture,
  });
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        const profile = data.profile;
        setProfileData({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phoneNumber,
          cin: profile.cin,
          profilePicture: profile.profilePicture || defaultProfilePicture,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleFirstNameChange = (event) => {
    setProfileData({ ...profileData, firstName: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setProfileData({ ...profileData, lastName: event.target.value });
  };

  const handleEmailChange = (event) => {
    setProfileData({ ...profileData, email: event.target.value });
  };

  const handlePhoneChange = (event) => {
    setProfileData({ ...profileData, phone: event.target.value });
  };

  const handleCinChange = (event) => {
    setProfileData({ ...profileData, cin: event.target.value });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfileData({
      ...profileData,
      profilePicture: URL.createObjectURL(file),
    });
    cd;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.patch("/api/user/profile", profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Changes saved!");
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

  return (
    <div className="edit-profile-container" style={{ backgroundColor: "#ffffff" }}>
      <h2>Edit Profile</h2>
      <div className="edit-profile-image">
        <img src={profileData.profilePicture} alt="Profile" />
      </div>
      <div className="edit-profile-info">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={profileData.firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={profileData.lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={profileData.email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={profileData.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div>
            <label htmlFor="cin">CIN:</label>
            <input
              type="text"
              id="cin"
              value={profileData.cin}
              onChange={handleCinChange}
            />
          </div>
          <div>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
