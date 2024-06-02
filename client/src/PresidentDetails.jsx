import React, { useState, useEffect } from "react";
import "./PresidentDetails.css";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PresidentDetails = () => {
  const navigate = useNavigate();
  const [president, setPresident] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const id = searchParams.get("id");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchData = () => {
    setIsPending(true);
    axios
      .get(`/api/users/president/details?id=${id}`)
      .then((response) => {
        setPresident(response.data);
        setError(null);
      })
      .catch(handleRequestError)
      .finally(() => {
        setIsPending(false);
      });
  };

  const handleRequestError = (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        setError("404: This president CANNOT BE FOUND on the server !");
      } else if (error.response.status === 500) {
        setError("500: Internal Server Error !");
      }
    } else if (error.request) {
      setError("Failed to fetch data !\nNo response received from the server.");
    } else {
      setError("Failed to fetch data !\nThis may be due to network issues.");
    }
  };

  const handleDelete = () => {
    // Show confirmation modal before deleting
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    setIsPending(true);
    setShowConfirmation(false);
    
    axios
      .delete(`/api/users/president/details?id=${id}`)
      .then(() => {
        navigate("/users");
      })
      .catch((error) => {
        handleRequestError(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Container fluid="md" className="rendering-details">
      <Row>
        {error && <div className="error-msg">{error}</div>}
        {isPending && <h2 className="loading-screen">Loading ...</h2>}
        {president && (
          <>
            <Row className="details-card">
              <Row>
                <Col xs={2} className="back-to-list">
                  <img
                    onClick={() => navigate("/users")}
                    src="/images/leftArrow.svg"
                    alt="back to list"
                  />
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
                  <h5 id="expiration-date">
                    This account expires on{" "}
                    {new Date(
                      new Date(president.createdAt).setFullYear(
                        new Date(president.createdAt).getFullYear() + 1
                      )
                    ).toLocaleDateString("en-GB")}
                  </h5>
                </Col>
                <Col className="controls">
                  <button
                    id="view-requests"
                    onClick={() => navigate(`/request/list?id=${president._id}`)}
                  >
                    View Requests
                  </button>
                  <button id="delete-user" onClick={handleDelete}>
                    Delete User
                  </button>
                </Col>
              </Row>
            </Row>
            {/* Confirmation Modal */}
            <Modal
              show={showConfirmation}
              onHide={() => setShowConfirmation(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <h2>Confirmation</h2>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <strong>Are you sure you want to delete this account?</strong>
                <br />
                *The account owner will be notified via email.
                <br />
                All of their requests will be removed as well.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowConfirmation(false)}
                >
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
