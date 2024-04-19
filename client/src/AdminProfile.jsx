import React from 'react';
import { Facebook, Envelope, Linkedin, BoxArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './Profile.css';

const AdminProfile = () => {
    return (
        <div className="profile-container">
            <img 
                src="https://th.bing.com/th/id/R.b91eab3932c4858ef0f3d6ad275824d9?rik=hLB2TEyjbHT8CQ&pid=ImgRaw&r=0"
                className="profile-img" 
                alt="Profile Picture"
            />
            <h1 className="profile-name">Name</h1>
            <Link to="/Account" className="classic-btn" style={{ textDecoration: 'none' }}>
                <PersonCircle color="white" size={20} /> Account
            </Link>
            <Link to="/Logout" className="classic-btn logout-btn" style={{ textDecoration: 'none' }}>
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