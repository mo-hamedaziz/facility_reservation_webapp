import React, { useState } from 'react';

const Step1 = ({ onNext }) => {
  const [selectedClassroom, setSelectedClassroom] = useState('');

  const handleNext = () => {
    if (selectedClassroom) {
      onNext(selectedClassroom);
    } else {
      alert('Please choose a classroom');
    }
  };

  return (
    <div class="card-container">
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
