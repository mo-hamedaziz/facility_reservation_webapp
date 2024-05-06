import React, { useState } from "react";
import { Briefcase, CalendarCheck, CalendarEvent } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./PresidentBody.css";

const PresidentBody = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const id = searchParams.get("id");

  return (
    <div className="container">
      <div className="boxes">
        <Link to={`/request/list?id=${id}`} style={{ textDecoration: "none" }}>
          <Card style={{ width: "18rem" }} className="box">
            <Card.Body>
              <Card.Title className="title">
                <h2>See my requests</h2>
              </Card.Title>
              <Card.Text>
                <Briefcase size={32} />
                <div className="number">
                  <h4 className="number-color">5</h4>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/BookingProcess" style={{ textDecoration: "none" }}>
          <Card style={{ width: "18rem" }} className="box">
            <Card.Body>
              <Card.Title className="title">
                <h2>Book a classrom</h2>
              </Card.Title>
              <Card.Text>
                <CalendarCheck size={32} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/Availability" style={{ textDecoration: "none" }}>
          <Card style={{ width: "18rem" }} className="box">
            <Card.Body>
              <Card.Title className="title">
                <h2>Check for Availability</h2>
              </Card.Title>
              <Card.Text>
                <CalendarEvent size={32} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default PresidentBody;
