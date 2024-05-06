import React, { useState, useEffect } from "react";
import {
  Facebook,
  Envelope,
  Linkedin,
  BoxArrowRight,
  PersonCircle,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
import "./Profile.css";

const PresidentProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        // Fetch user data from your backend
        const response = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the request headers
          },
        });
        setUserData(response.data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, []);

  return (
    <div className="profile-container">
      {userData ? (
        <>
          <img
            src={userData.profilePicture}
            className="profile-img"
            alt="Profile Picture"
          />
          <h1 className="profile-name">{userData.name}</h1>
          <h2 className="profile-club">{userData.club}</h2>
          <p className="profile-bio">{userData.bio}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link
        to="/Account"
        className="classic-btn"
        style={{ textDecoration: "none" }}
      >
        <PersonCircle color="white" size={20} /> Account
      </Link>
      <Link
        to="/Logout"
        className="classic-btn logout-btn"
        style={{ textDecoration: "none" }}
      >
        <BoxArrowRight color="white" size={20} /> Log Out
      </Link>
      <div className="social-media">
        <Link to="/facebook_link" className="social-icon">
          <Facebook size={32} />
        </Link>
        <Link to="/email_link" className="social-icon">
          <Envelope size={32} />
        </Link>
        <Link to="/linkedin_link" className="social-icon">
          <Linkedin size={32} />
        </Link>
      </div>
    </div>
  );
};

export default PresidentProfile;
