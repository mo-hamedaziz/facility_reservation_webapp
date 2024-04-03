import { useState } from "react";
import "./signup.css"; // Importez le fichier CSS pour le style du SignUp

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cin, setCin] = useState("");
  const [clubName, setClubName] = useState("");
  const [startMandate, setStartMandate] = useState("");

  const formData = {
    firstName,
    lastName,
    email,
    phoneNumber,
    cin,
    clubName,
    startMandate
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/signup_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add signup data');
      }
  
      // Assuming successful signup, clear the form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setCin("");
      setClubName("");
      setStartMandate("");
  
      alert('Signup successful!');
    } catch (error) {
      console.error('Error adding signup data:', error.message);
      alert('Failed to sign up. Please try again later.');
    }
  };
  

  return (
    <div className="signup-container">
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
          <label htmlFor="startMandate" className="signup-label">
            Start Mandate:
          </label>
          <input
            type="date"
            id="startMandate"
            value={startMandate}
            onChange={(e) => setStartMandate(e.target.value)}
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
