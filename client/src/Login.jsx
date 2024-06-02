import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Utilisation de useNavigate pour la redirection
import "./Login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe
  const navigate = useNavigate(); // Récupérer la fonction de navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });

      if (!response.data.token) {
        throw new Error("Invalid credentials");
      }

      localStorage.setItem("token", response.data.token);
      if (response.data.isAdmin) {
        navigate(`/dashboard/admin?id=${response.data.userId}`); // Rediriger vers la page d'administration
      } else {
        navigate(`/dashboard/president?id=${response.data.userId}`); // Rediriger vers la page du président du club
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessage("Invalid credentials");
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot your password?");
  };

  return (
    <div className="login-container">
      {errorMessage && (
        <div className="error-msg">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
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
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your password"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)} // Inverser l'état pour afficher/masquer le mot de passe
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>
        <div className="forget">
          <span className="link-style" onClick={handleForgotPassword}>
            Forgot your password?
          </span>
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
