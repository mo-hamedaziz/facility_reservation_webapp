import React from 'react';
import { Facebook, Envelope, Linkedin, BoxArrowRight, PersonCircle } from 'react-bootstrap-icons'; // Importing additional icons
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
            <button className="classic-btn" onClick={() => window.location.href='/account'}>
                <PersonCircle color="white" size={20} /> Account {/* Added PersonCircle icon */}
            </button>
            <button className="classic-btn logout-btn" onClick={() => window.location.href='/logout'}>
                <BoxArrowRight color="white" size={20} /> Log Out {/* Added BoxArrowRight icon */}
            </button>
            <div className="social-media">
                <Facebook size={32} className="social-icon" />
                <Envelope size={32} className="social-icon" />
                <Linkedin size={32} className="social-icon" />
            </div>
        </div>
    );
}

export default AdminProfile;