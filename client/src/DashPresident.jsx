import React from "react";
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
    </div>
  );
};

export default DashPresident;
