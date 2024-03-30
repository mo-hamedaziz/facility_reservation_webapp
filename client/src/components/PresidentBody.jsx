import React, { useState } from 'react';
import RequestList from './RequestList';
import { Briefcase } from 'react-bootstrap-icons';
import "./PresidentBody.css"

const PresidentBody = () => {
    const [showRequestList, setShowRequestList] = useState(false);

    const handleClick = () => {
        setShowRequestList(prevShowRequestList => !prevShowRequestList);
    };

    return (
        <div className="container">
            <div className="box" onClick={handleClick}>
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
            {showRequestList && <RequestList />}
        </div>
    );
};

export default PresidentBody;