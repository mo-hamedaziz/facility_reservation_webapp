import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AdminProfile from './AdminProfile';
import AdminBody from './AdminBody';
import "./DashAdmin.css";

const DashAdmin = () => {
    return (
        <div className="dash-admin">
            <Navbar className="dash-admin-navbar" />
            <div className="dash-admin-content">
                <AdminProfile className="dash-admin-profile" />
                <AdminBody className="dash-admin-body" />
            </div>
            <Footer className="dash-admin-footer" />
        </div>
    );
};

export default DashAdmin;