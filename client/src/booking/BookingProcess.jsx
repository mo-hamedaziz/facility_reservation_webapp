import React, { useState } from 'react';
import Step1 from './Step1.jsx';
import Step2 from './Step2.jsx';
import Step3 from './Step3.jsx';


const BookingProcess = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleClassroomSelection = () => {
    setCurrentStep(2);
  };

  const handleDateTimeSelection = () => {
    setCurrentStep(3);
  };

  const handleFormSubmit = () => {
    setCurrentStep(1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div  class="background-image">
      {currentStep === 1 && <Step1 onNext={handleClassroomSelection} />}
      {currentStep === 2 && <Step2 onNext={handleDateTimeSelection} onBack={handleBack} />}
      {currentStep === 3 && <Step3 onSubmit={handleFormSubmit} onBack={handleBack} />}
    </div>
  );
};

export default BookingProcess;
