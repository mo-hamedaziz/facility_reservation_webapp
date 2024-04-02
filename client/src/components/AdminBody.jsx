import React, { useState } from 'react';
import RequestList from './RequestList';
import PresidentsList from './PresidentsList';
import { Briefcase, PeopleFill } from 'react-bootstrap-icons';
import { Card } from 'react-bootstrap';
import "./AdminBody.css"

const AdminBody = () => {
    const [showRequestList, setShowRequestList] = useState(false);
    const [showPresidentsList, setShowPresidentsList] = useState(false);

    const handleRequestClick = () => {
        setShowRequestList(prevShowRequestList => !prevShowRequestList);
        if (showPresidentsList) {
            setShowPresidentsList(false);
        }
    };

    const handlePresidentsClick = () => {
        setShowPresidentsList(prevShowPresidentsList => !prevShowPresidentsList);
        if (showRequestList) {
            setShowRequestList(false);
        }
    };

    return (
        <div className="container">
            <div className="boxes">
                <Card style={{ width: '18rem' }} className="box" onClick={handleRequestClick}>
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
                <Card style={{ width: '18rem' }} className="box" onClick={handlePresidentsClick}>
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
            </div>
            {showRequestList && <RequestList />}
            {showPresidentsList && <PresidentsList />}
        </div>
    );
};

export default AdminBody;