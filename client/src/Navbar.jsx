import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../src/assets/logo.png";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="nav-elements">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/bookingProcess">Book</NavLink>
          </li>
          <li>
            <div className="dropdown" onClick={toggleDropdown}>
              <NavLink to="#">My Profile</NavLink>
              {showDropdown && (
                <div className="dropdown-content">
                  <NavLink to="/accountdetails">Manage Profile</NavLink>
                  <NavLink to="/login">Logout</NavLink>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
