import React from 'react';
import { Card } from 'react-bootstrap';
import { Briefcase, PeopleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import "./AdminBody.css"

const AdminBody = () => {
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
                                    <h4>5</h4>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/PresidentList" style={{ textDecoration: 'none' }}>
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Body>
                            <Card.Title className="title"><h2>Presidents</h2></Card.Title>
                            <Card.Text>
                                <PeopleFill size={32} />
                                <div className="number">
                                    <h4>3</h4>
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