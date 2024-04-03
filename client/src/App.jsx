import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            path="/"
            element={<Home />}
          />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="login"
            element={<Login />}
          />
          <Route 
            path="/dashboard/president"
            element={<Dashboard userType={'president'}/>}
          />
          <Route 
            path="/dashboard/admin"
            element={<Dashboard userType={'admin'}/>}
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
