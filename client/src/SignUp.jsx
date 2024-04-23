import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cin, setCin] = useState("");
  const [clubName, setClubName] = useState("");
  const [startOfMandate, setStartOfMandate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !cin ||
      !clubName ||
      !startOfMandate
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const newSignupRequest = {
      firstName,
      lastName,
      email,
      phoneNumber,
      cin,
      clubName,
      startOfMandate,
    };

    axios
      .post("/api/user/signup", newSignupRequest)
      .then((response) => {
        if (!response.data) {
          throw new Error("Sign up failed");
        }
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate("/signup-success");
        }, 1000);
      })
      .catch((error) => {
        console.error("Sign up error:", error.message);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="signup-container">
      <div className={errorMessage ? "error-msg" : ""}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <h1 className="signup-heading">Sign Up</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="input-container">
          <label htmlFor="firstName" className="signup-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="signup-input"
            placeholder="Enter your first name"
          />
        </div>
        <div className="input-container">
          <label htmlFor="lastName" className="signup-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="signup-input"
            placeholder="Enter your last name"
          />
        </div>
        <div className="input-container">
          <label htmlFor="email" className="signup-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            placeholder="Enter your email address"
          />
        </div>
        <div className="input-container">
          <label htmlFor="phoneNumber" className="signup-label">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="signup-input"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="input-container">
          <label htmlFor="cin" className="signup-label">
            CIN:
          </label>
          <input
            type="text"
            id="cin"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            className="signup-input"
            placeholder="Enter your CIN"
          />
        </div>
        <div className="input-container">
          <label htmlFor="clubName" className="signup-label">
            Club s Name:
          </label>
          <input
            type="text"
            id="clubName"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            className="signup-input"
            placeholder="Enter your club's name"
          />
        </div>
        <div className="input-container">
          <label htmlFor="startOfMandate" className="signup-label">
            Start Mandate:
          </label>
          <input
            type="date"
            id="startOfMandate"
            value={startOfMandate}
            onChange={(e) => setStartOfMandate(e.target.value)}
            className="signup-input"
          />
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
