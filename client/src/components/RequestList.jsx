import React, { useState } from 'react';

const RequestList = () => {
    const [requests, setRequests] = useState([
        { id: 1, title: 'Request 1' },
        { id: 2, title: 'Request 2' },
        { id: 3, title: 'Request 3' },
        // Add more requests here...
    ]);

    return (
        <div>
            <h2>Request List</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>{request.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RequestList;