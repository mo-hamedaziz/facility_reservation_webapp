import React, { useState } from 'react';


const Step2 = ({ onNext, onBack }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onNext(selectedDate, selectedTime);
    } else {
      alert('Please choose date and time');
    }
  };

  return (
    <div class="card-container">
    <div className="card">
      <h2>Step 2: Choose Date and Time</h2>
      <div className="card-content">
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        <div>
          <input type="radio" id="morning" name="time" value="morning" onChange={() => setSelectedTime('morning')} />
          <label htmlFor="morning">Morning</label>
        </div>
        <div>
          <input type="radio" id="eve" name="time" value="evening" onChange={() => setSelectedTime('evening')} />
          <label htmlFor="eve">Evening</label>
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
