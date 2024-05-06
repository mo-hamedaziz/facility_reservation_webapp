import React, { useState, useEffect } from 'react';
import { Facebook, Envelope, Linkedin, BoxArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const AdminProfile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
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
                </>
            ) : (
                <p>Loading...</p>
            )}
            <Link
                to="/Account"
                className="classic-btn"
                style={{ textDecoration: 'none' }}
            >
                <PersonCircle color="white" size={20} /> Account
            </Link>
            <Link
                to="/Logout"
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
