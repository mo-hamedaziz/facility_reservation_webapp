import React, { useState } from 'react';

const PresidentList = () => {
    const [requests, setPresidents] = useState([
        { id: 1, title: 'President 1' },
        { id: 2, title: 'President 2' },
        { id: 3, title: 'President 3' },
        // Add more requests here...
    ]);

    return (
        <div>
            <h2>Presidents List</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>{request.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PresidentList;