import React, { useState } from "react";
import "./Navbar.css";
import logo from "../src/assets/logo.png"; // Importez votre logo depuis le chemin correct
import { Link } from "react-router-dom";

function Navbar() {
  const [showOptions, setShowOptions] = useState(false);

  const handlePhotoClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />{" "}
      {/* Ajoutez votre logo ici */}
      <ul className="nav-list">
        <li className="nav-item">
          <span role="img" aria-label="Home"></span> Home
        </li>
        <li className="nav-item">
          <span role="img" aria-label="Book"></span> Book
        </li>
      </ul>
      <div className="photo-item" onClick={handlePhotoClick}>
        <div className="photo-circle"></div>
        {showOptions && (
          <div className="options-dropdown">
            <ul className="options-list">
              <Link to="/AccountDetails">
                <li className="option">Account Details</li>
              </Link>

              <Link to="/login">
                <li className="option">Logout</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

