import React, { useState } from "react";
import defaultProfilePicture from "./assets/user.png"; // Importez votre image par défaut

import "./ProfilePage.css";

function ProfilePage() {
  const [firstName, setFirstName] = useState("Ines");
  const [lastName, setLastName] = useState("Zghal");
  const [email, setEmail] = useState("ines.zghal@insat.ucar.tn");
  const [phone, setPhone] = useState("29361209");
  const [cin, setCin] = useState("14510081");
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleCinChange = (event) => {
    setCin(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file)); // Convertit le fichier en URL d'objet
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Envoyer les données modifiées au serveur ici
    console.log("Changes saved!");
  };

  return (
    <div className="profile-container" style={{ backgroundColor: "#ffffff" }}>
      <h2>Edit Profile</h2>
      <div className="profile-image">
        <img src={profilePicture} alt="Profile" />
      </div>
      <div className="profile-info">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div>
            <label htmlFor="cin">CIN:</label>
            <input
              type="text"
              id="cin"
              value={cin}
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
