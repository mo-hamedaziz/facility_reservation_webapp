import React, { useState, useEffect } from 'react';
import { Facebook, Envelope, Linkedin, BoxArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const AdminProfile = () => {
    const [adminData, setAdminData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const searchParams = new URLSearchParams(useLocation().search);
    const id = searchParams.get("id");
    useEffect(() => {
        const fetchAdminData = async () => {
            setIsPending(true);
            try {
                
                const response = await axios.get(`/api/admin/details?id=${id}`);
                if (response.status === 200) {
                    const data = response.data;
                    setAdminData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        clubName: data.clubName,
                    });
                    setError(null);
                } else {
                    throw new Error('Admin not found');
                }
            } catch (error) {
                setError("Failed to fetch data. This may be due to network issues or the admin does not exist.");
                console.error('Error fetching admin data:', error);
            } finally {
                setIsPending(false);
            }
        };
    
        fetchAdminData();
    }, [id]);

    return (
        <div className="profile-container">
            {error && <div className="error-msg">{error}</div>}
            {isPending ? (
                <p>Loading...</p>
            ) : (
                adminData && (
                    <>
                        <h1 className="profile-name">{`${adminData.firstName} ${adminData.lastName}`}</h1>
                        <h2 className="profile-club">{adminData.clubName}</h2>
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
                    </>
                )
            )}
        </div>
    );
}

export default AdminProfile;