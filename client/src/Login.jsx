import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("guest");

  const handleLogin = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour gérer la soumission du formulaire de connexion
    console.log("Login:", email, password, userType);
  };

  const handleForgotPassword = () => {
    // Ajoutez ici la logique pour gérer le lien "Forgot your password?"
    console.log("Forgot your password?");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-container">
          <label htmlFor="email" className="login-label">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            placeholder="Enter your email address"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="Enter your password"
          />
        </div>
        <div className="forget">
          <span className="link-style" onClick={handleForgotPassword}>
            Forgot your password?
          </span>
        </div>
        <div className="input-container">
          <label htmlFor="userType" className="login-label">
            User Type:
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="login-select"
          >
            <option value="clubPresident">Club President</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <div>
          <span>
            Don t have an account? <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
