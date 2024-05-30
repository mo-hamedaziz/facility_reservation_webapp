import React, { useState, useEffect } from 'react';
import { Facebook, Envelope, Linkedin, BoxArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        name: "",
        profilePicture: "",
    });

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = response.data;
                const profile = data.profile;
                setAdminData({
                    name: `${profile.firstName} ${profile.lastName}`,
                    profilePicture: profile.profilePicture,
                });
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchAdminData();
    }, []);

    return (
        <div className="profile-container">
            {adminData.name ? (
                <>
                    <img
                        src={adminData.profilePicture}
                        className="profile-img"
                        alt="Profile Picture"
                    />
                    <h1 className="profile-name">{adminData.name}</h1>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <Link
                to="/accountdetails"
                className="classic-btn"
                style={{ textDecoration: 'none' }}
            >
                <PersonCircle color="white" size={20} /> Account
            </Link>
            <Link
                to="/login"
                className="classic-btn logout-btn"
                style={{ textDecoration: 'none' }}
            >
                <BoxArrowRight color="white" size={20} /> Log Out
            </Link>
            <div className="social-media">
                <Link to="/Facebook_Link" className="social-icon" style={{ textDecoration: 'none' }}>
                    <Facebook size={32} />
                </Link>
                <Link to="/Email_Link" className="social-icon" style={{ textDecoration: 'none' }}>
                    <Envelope size={32} />
                </Link>
                <Link to="/Linkedin_Link" className="social-icon" style={{ textDecoration: 'none' }}>
                    <Linkedin size={32} />
                </Link>
            </div>
        </div>
    );
}

export default AdminProfile;    