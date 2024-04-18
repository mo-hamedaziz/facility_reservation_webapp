import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import Home from "./Home";
import DashboardAdmin from "./DashboardAdmin";
import DashboardPresident from "./DashboardPresident";
import SignUpSuccess from "./SignUpSuccess";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/president" element={<DashboardPresident />} />
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/accountdetails" element={<ProfilePage />} />
          <Route path="/signup-success" element={<SignUpSuccess />} />
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
