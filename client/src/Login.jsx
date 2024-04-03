import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("clubPresident");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userType === "clubPresident" ? "/presidents" : "/admins";
      const response = await fetch(`http://localhost:3333${endpoint}`);
      if (response.ok) {
        const data = await response.json();
        const user = data.find((u) => u.email === email && u.password === password);
        if (user) {
          if (userType === "clubPresident") {
            navigate("/dashboard/president");
          } else {
            navigate("/dashboard/admin");
          }
        } else {
          console.log("Invalid email or password");
        }
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleForgotPassword = () => {
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
            required
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
            required
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
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
