import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Briefcase, PeopleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from "./AdminBody.module.css";

const AdminBody = () => {
  const [presidentCount, setPresidentCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    axios.get(`/api/presidents/count`)
      .then(response => {
        setPresidentCount(response.data.count);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`/api/booking/request/count`)
      .then(response => {
        setRequestCount(response.data.count);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles["dash-container"]}>
      <div className={styles.boxes}>
        <Link to={`/request/list`} style={{ textDecoration: 'none' }}>
          <Card style={{ width: '18rem' }} className={styles.box}>
            <Card.Body>
              <Card.Title className={styles.titlex}>See all booking requests</Card.Title>
              <Card.Text>
                <Briefcase size={32} />
                <div className={styles.number}>
                  <h4>{requestCount}</h4>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/users" style={{ textDecoration: 'none' }}>
          <Card style={{ width: '18rem' }} className={styles.box}>
            <Card.Body>
              <Card.Title className={styles.titlex}>See presidents</Card.Title>
              <Card.Text>
                <PeopleFill size={32} />
                <div className={styles.number}>
                  <h4>{presidentCount}</h4>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminBody;