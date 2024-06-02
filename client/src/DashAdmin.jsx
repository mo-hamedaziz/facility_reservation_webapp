import React from 'react';
import AdminProfile from './AdminProfile';
import AdminBody from './AdminBody';
import "./DashAdmin.css";

const DashAdmin = () => {
    return (
        <div className="dash-admin">
            <div className="dash-admin-content">
                <AdminProfile className="dash-admin-profile" />
                <AdminBody className="dash-admin-body" />
            </div>
        </div>
    );
};

export default DashAdmin;