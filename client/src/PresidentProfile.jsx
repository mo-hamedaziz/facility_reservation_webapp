import React, { useState, useEffect } from "react";
import {
  Facebook,
  Envelope,
  Linkedin,
  BoxArrowRight,
  PersonCircle,
} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import animImage from '../public/images/louay.jpg';
import securiNetsImage from '../public/images/aziz.jpg';
import juniorImage from '../public/images/ines.jpg';
import acmInsatImage from '../public/images/karim.jpg';
import defaultImage from '../public/images/default.jpg';

const PresidentProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const id = searchParams.get("id");

  const clubImages = {
    'Anim': animImage,
    'SecuriNets': securiNetsImage,
    'JUNIOR': juniorImage,
    'ACM INSAT': acmInsatImage,
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsPending(true);
      try {
        console.log(id);
        const response = await axios.get(`/api/users/president/details?id=${id}`);
        const data = response.data;
        setProfileData({
          firstName: data.firstName,
          lastName: data.lastName,
          clubName: data.clubName,
        });
        setError(null);
      } catch (error) {
        setError("Failed to fetch data. This may be due to network issues.");
        console.error("Error fetching profile data:", error);
      } finally {
        setIsPending(false);
      }
    };

    fetchProfileData();
  }, [id]);

  return (
    <div className="profile-container">
      {error && <div className="error-msg">{error}</div>}
      {isPending ? (
        <p>Loading...</p>
      ) : (
        profileData && (
          <>
            <img src={clubImages[profileData.clubName] || defaultImage} alt="President" className="profile-img" />
            <h1 className="profile-name">{`${profileData.firstName} ${profileData.lastName}`}</h1>
            <h2 className="profile-club">{profileData.clubName}</h2>
            <Link
              to="/accountdetails"
              className="classic-btn"
              style={{ textDecoration: "none" }}
            >
              <PersonCircle color="white" size={20} /> Account
            </Link>
            <Link
              to="/login"
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
          </>
        )
      )}
    </div>
  );
};

export default PresidentProfile;