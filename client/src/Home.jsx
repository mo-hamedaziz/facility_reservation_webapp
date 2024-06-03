import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import salleA from "./assets/audito.jpg";
import salleB from "./assets/conf.jpg";

const Home = () => {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const rooms = [
    {
      id: 1,
      name: "Auditorium",
      image: salleA,
      events: ["Réunion marketing"],
    },
    {
      id: 2,
      name: "Conference room",
      image: salleB,
      events: ["Présentation client"],
    },
  ];

  return (
    <div>
      <div className="profile-container-home">
        <h2>Facility Reservation </h2>
        <div className="date-container-home">
          <label>Date:</label>
          <span>{today}</span>
        </div>
        <div className="profile-info-home">
          {rooms.map((room) => (
            <div key={room.id} className="room-box-home">
              <div className="profile-image-home">
                <img src={room.image} alt={room.name} />
              </div>
              <div className="room-details-home">
                <label>Salle:</label>
                <span>{room.name}</span>
              </div>
              <div className="room-events-home">
                <label>Événements:</label>
                <ul>
                  {room.events.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div> {/* Closing tag for profile-info-home div */}
        <div className="button-container">
          <Link to="/login" className="login-button">Login</Link>
        </div>
      </div> {/* Closing tag for profile-container-home div */}
    </div>
  );
};

export default Home;