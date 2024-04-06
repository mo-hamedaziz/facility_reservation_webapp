import React from 'react';
import { Briefcase, CalendarCheck, CalendarEvent } from 'react-bootstrap-icons';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./PresidentBody.css"

const PresidentBody = () => {
    return (
        <div className="container">
            <div className="boxes">
                <Link to="/RequestList" style={{ textDecoration: 'none' }}>
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Body>
                            <Card.Title className="title"><h2>Requests</h2></Card.Title>
                            <Card.Text>
                                <Briefcase size={32} />
                                <div className="number">
                                    <h4 className="number-color">5</h4>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/Booking" style={{ textDecoration: 'none' }}>
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Body>
                            <Card.Title className="title"><h2>Booking</h2></Card.Title>
                            <Card.Text>
                                <CalendarCheck size={32} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/Availability" style={{ textDecoration: 'none' }}>
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Body>
                            <Card.Title className="title"><h2>See Availability</h2></Card.Title>
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