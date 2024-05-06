import React from "react";
import Footer from "./Footer";
import PresidentProfile from "./PresidentProfile";
import PresidentBody from "./PresidentBody";
import "./DashPresident.css";

const DashPresident = () => {
  return (
    <div className="dash-president">
      <div className="dash-president-content">
        <PresidentProfile className="dash-president-profile" />
        <PresidentBody className="dash-president-body" />
      </div>
      <Footer className="dash-president-footer" />
    </div>
  );
};

export default DashPresident;
