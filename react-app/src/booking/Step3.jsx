import React, { useState } from 'react';

const Step3 = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    eventType: '',
    eventName: '',
    eventDescription: '',
    logistics: '',
    participants: '',
    comment: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div class="card-container">
    <div className="card">
      <h2>Step 3: Enter Event Details</h2>
      <div className="card-content">
        <input type="text" name="eventType" placeholder="Event Type" value={formData.eventType} onChange={handleChange} />
        <input type="text" name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleChange} />
        <textarea name="eventDescription" placeholder="Event Description" value={formData.eventDescription} onChange={handleChange} />
        <input type="text" name="logistics" placeholder="Logistics" value={formData.logistics} onChange={handleChange} />
        <input type="number" name="participants" placeholder="Number of Participants" value={formData.participants} onChange={handleChange} />
        <textarea name="comment" placeholder="Add a comment" value={formData.comment} onChange={handleChange} />
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="card-actions">
        <button onClick={handleSubmit}>Send Request</button>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
    </div>
  );
};

export default Step3;

