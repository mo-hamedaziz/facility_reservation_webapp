import React, { useState, useEffect} from 'react';
import './SignupRequestPresidentListSelector.css';
import { Container, Row, Col } from 'react-bootstrap';
import PresidentList from './PresidentList';
import SignupRequests from './SignupRequests';

const SignupRequestPresidentListSelector = () => {

  const [selectedOption, setSelectedOption] = useState('option1'); // Default value

  const handleSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <Container>
      <Row className="options-list">
        <Col
          xs={6}
          className={`option ${selectedOption === 'option1' ? 'selected' : ''}`}
          id="option1"
          onClick={() => handleSelect('option1')}
        >
          List of presidents
        </Col>
        <Col
          xs={6}
          className={`option ${selectedOption === 'option2' ? 'selected' : ''}`}
          id="option2"
          onClick={() => handleSelect('option2')}
        >
          List of requested signups
        </Col>
      </Row>
      <Row className='option-output'>
        {selectedOption === 'option1' && <PresidentList />}
        {selectedOption === 'option2' && <SignupRequests />}
      </Row>
    </Container>
  );
};

export default SignupRequestPresidentListSelector;
