import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route
            path="login"
            element={
              <div className="app-container">
                <Login />
              </div>
            }
          />

          <Route path="AccountDetails" element={<ProfilePage />} />
          <Route
            path="*"
            element={
              <div>
                <h1>Not Found</h1>
                <p>This route is yet to be defined</p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
