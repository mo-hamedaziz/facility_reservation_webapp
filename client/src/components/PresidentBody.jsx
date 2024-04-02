import React, { useState } from 'react';
import RequestList from './RequestList';
import { Briefcase, CalendarCheck, CalendarEvent } from 'react-bootstrap-icons';
import { Card, Button } from 'react-bootstrap';
import "./PresidentBody.css"

const PresidentBody = () => {
    const [showRequestList, setShowRequestList] = useState(false);

    const handleClick = () => {
        setShowRequestList(prevShowRequestList => !prevShowRequestList);
    };

    return (
        <div className="container">
            <div className="boxes">
                <Card style={{ width: '18rem' }} className="box" onClick={handleClick}>
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
                <Card style={{ width: '18rem' }} className="box">
                    <Card.Body>
                        <Card.Title className="title"><h2>Booking</h2></Card.Title>
                        <Card.Text>
                            <CalendarCheck size={32} />
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className="box">
                    <Card.Body>
                        <Card.Title className="title"><h2>See Availability</h2></Card.Title>
                        <Card.Text>
                            <CalendarEvent size={32} />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            {showRequestList && <RequestList />}
        </div>
    );
};

export default PresidentBody;