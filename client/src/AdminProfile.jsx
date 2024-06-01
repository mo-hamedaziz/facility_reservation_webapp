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
import defaultPhoto from '../public/images/sonia.jpg'; // Add this line

const AdminProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(`/api/admin/details?id=${id}`);
        if (response.status === 200) {
          const data = response.data;
          setProfileData({
            firstName: data.firstName,
            lastName: data.lastName,
          });
          setError(null);
        } else {
          throw new Error('Admin not found');
        }
      } catch (error) {
        setError("Failed to fetch data. This may be due to network issues or the admin does not exist.");
        console.error("Error fetching admin data:", error);
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
            <img src={defaultPhoto} alt="Admin" className="profile-img" /> {/* Add this line */}
            <h1 className="profile-name">{`${profileData.firstName} ${profileData.lastName}`}</h1>
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

export default AdminProfile;