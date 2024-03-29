import React, { useState } from 'react';
import './PresidentDetails.css';
import useFetch from './useFetch';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PresidentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: president, isPending, error } = useFetch('http://localhost:3333/presidents/' + id);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    // Show confirmation modal before deleting
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    fetch(
        `http://localhost:3333/presidents/${id}`,{
            method:'DELETE',
        }
    );
    navigate('/users');
    setShowConfirmation(false); // Close the confirmation modal
  };

  return (
    <Container fluid="md" className="rendering-details">
      <Row>
        {error && <h1>President Not Found on the Server</h1>}
        {isPending && <div>Loading ...</div>}
        {president && (
          <>
            <Row className="details-card">
              <Row>
                <Col xs={2} className="back-to-list">
                    <img onClick={() => navigate('/users')} src="/images/leftArrow.svg" alt="back to list" />
                </Col>
              </Row>
              <Row className="details">
                <Col lg={3} md={5} className="picture-and-name">
                  <img
                    className="detailed-profile-picture"
                    src="/images/anonymousProfilePicture.svg"
                    alt="Profile Picture"
                  />
                  <h2>
                    {president.firstName} {president.lastName}
                  </h2>
                </Col>
                <Col lg={5} md={5} className="profile-data">
                  <h3>
                    <strong>Club Name: </strong>
                    {president.clubName}
                  </h3>
                  <h3>
                    <strong>CIN: </strong>
                    {president.cin}
                  </h3>
                  <h3>
                    <strong>Phone Number: </strong>
                    {president.phoneNumber}
                  </h3>
                  <h3>
                    <strong>Email: </strong>
                    {president.email}
                  </h3>
                </Col>
                <Col className="controls">
                  <button id="view-requests" onClick={() => navigate(`/requests/user/${president.id}`)}>
                    View Requests
                  </button>
                  <button id="delete-user" onClick={handleDelete}>
                    Delete User
                  </button>
                </Col>
              </Row>
            </Row>
            {/* Confirmation Modal */}
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Row>
    </Container>
  );
};

export default PresidentDetails;
