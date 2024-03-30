import React, { useState } from 'react';
import RequestList from './RequestList';
import PresidentsList from './PresidentsList';
import { Briefcase, PeopleFill } from 'react-bootstrap-icons';
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
                <div className="box" onClick={handleRequestClick}>
                    <div className="box-title">
                        <h2>Requests</h2>
                    </div>
                    <span className="box-content">
                        <Briefcase size={32} />
                        <div className="number">
                            <h4>5</h4>
                        </div>
                    </span>
                </div>
                <div className="box" onClick={handlePresidentsClick}>
                    <div className="box-title">
                        <h2>Presidents</h2>
                    </div>
                    <span className="box-content">
                        <PeopleFill size={32} />
                        <div className="number">
                            <h4>3</h4>
                        </div>
                    </span>
                </div>
            </div>
            {showRequestList && <RequestList />}
            {showPresidentsList && <PresidentsList />}
        </div>
    );
};

export default AdminBody;