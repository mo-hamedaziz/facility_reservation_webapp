import React from 'react';
import { Facebook, Twitter, Linkedin } from 'react-bootstrap-icons';
import './Profile.css';

const AdminProfile = () => {
    return (
        <div className="profile-container">
            <img 
                src="https://1.bp.blogspot.com/-cf0NHWFhhTE/T1t25DWD0aI/AAAAAAAAAA8/l6J5uj3EP40/s1600/embalse-porce-ii.png"
                className="profile-img" 
                alt="Profile Picture"
            />
            <h1 className="profile-name">Name</h1>
            <button className="classic-btn" onClick={() => window.location.href='/account'}>Account</button>
            <button className="classic-btn logout-btn" onClick={() => window.location.href='/logout'}>Log Out</button>
            <div className="social-media">
                <Facebook color="blue" size={32} className="social-icon" />
                <Twitter color="skyblue" size={32} className="social-icon" />
                <Linkedin color="blue" size={32} className="social-icon" />
            </div>
        </div>
    );
}

export default AdminProfile;