import React, { useState, useEffect } from "react";
import { Briefcase, CalendarCheck, CalendarEvent } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import styles from "./PresidentBody.module.css";

const CustomCard = ({ title, children, to }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <div className={styles.box}>
      <div className={styles.cardBody}>
        <h2 className={styles.titlex}>{title}</h2>
        <div className={styles.cardText}>{children}</div>
      </div>
    </div>
  </Link>
);

const PresidentBody = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const id = searchParams.get("id");

  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    axios.get(`/api/users/president/?id=${id}`)
      .then(response => {
        setRequestCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching request count:', error);
      });
  }, [id]);

  return (
    <div className={styles["dash-container"]}>
      <div className={styles.boxes}>
        <CustomCard to={`/request/list?id=${id}`} title="See my requests">
          <Briefcase size={32} />
          <div className={styles.number}>
            <h4 className={styles["number-color"]}>{requestCount}</h4>
          </div>
        </CustomCard>
        <CustomCard to="/BookingProcess" title="Book a classroom">
          <CalendarCheck size={32} />
        </CustomCard>
        <CustomCard to="/Availability" title="Check for Availability">
          <CalendarEvent size={32} />
        </CustomCard>
      </div>
    </div>
  );
};

export default PresidentBody;