import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-logo">
                <i className="bi bi-copyright"></i>
            </div>
            <div className="footer-elements">
                <ul>
                    <li>
                        <a href="/">Facility Reservation</a>
                    </li>
                    <li>
                        <a href="/">2023-2024</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;