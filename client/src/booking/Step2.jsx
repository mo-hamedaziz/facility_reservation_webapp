// frontend/components/Step2.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Step2 = ({ onNext, onBack }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleNext = async () => {
    if (selectedDate && selectedTime) {
      try {
        // Send a POST request to the backend endpoint '/api/booking-requests/step2'
        const response = await axios.post('http://localhost:3000/api/booking-requests/step2', {
          selectedDate,
          selectedTime
        });

        // Call onNext with the response data or any relevant information
        onNext(response.data); // Assuming response.data contains the necessary information
      } catch (error) {
        console.error('Error:', error);
        // Handle error if needed
      }
    } else {
      alert('Please choose date and time');
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Step 2: Choose Date and Time</h2>
        <div className="card-content">
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          <div>
            <input type="radio" id="morning" name="time" value="morning" onChange={() => setSelectedTime('morning')} />
            <label htmlFor="morning">Morning</label>
          </div>
          <div>
            <input type="radio" id="evening" name="time" value="evening" onChange={() => setSelectedTime('evening')} />
            <label htmlFor="evening">Evening</label>
          </div>
          <div>
            <input type="radio" id="whole-day" name="time" value="whole day" onChange={() => setSelectedTime('whole day')} />
            <label htmlFor="whole-day">Whole Day</label>
          </div>
        </div>
        <div className="card-actions">
          <button onClick={onBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
