import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const Step1 = ({ onNext }) => {
  const [selectedClassroom, setSelectedClassroom] = useState('');

  const handleNext = async () => {
    if (selectedClassroom) {
      try {
        // Send a POST request to the backend endpoint '/api/booking-requests/step1'
        const response = await axios.post('http://localhost:3000/api/booking-requests/step1', { selectedClassroom });
        
        // Call onNext with the response data or any relevant information
        onNext(response.data); // Assuming response.data contains the necessary information
      } catch (error) {
        console.error('Error:', error);
        // Handle error if needed
      }
    } else {
      alert('Please choose a classroom');
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Step 1: Choose Classroom</h2>
        <div className="card-content">
          <select value={selectedClassroom} onChange={(e) => setSelectedClassroom(e.target.value)}>
            <option value="">Select Classroom</option>
            <option value="classroom1">Classroom 1</option>
            <option value="classroom2">Classroom 2</option>
          </select>
        </div>
        <div className="card-actions">
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
