import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SignupRequestDetails = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const id = searchParams.get("id");

  const [request, setRequest] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [showDenyConfirmation, setShowDenyConfirmation] = useState(false);
  const [showApproveConfirmation, setShowApproveConfirmation] = useState(false);

  const fetchData = () => {
    setIsPending(true);
    axios
      .get(`/api/users/signup/request/details?id=${id}`)
      .then((response) => {
        setRequest(response.data);
        setError(null);
      })
      .catch(handleRequestError)
      .finally(() => {
        setIsPending(false);
      });
  };

  const handleRequestError = (error) => {
    if (error.response) {
      setError(
        `Error ${error.response.status}: ${
          error.response.data.error || error.response.data
        }`
      );
    } else if (error.request) {
      setError("Failed to fetch data! No response received from the server.");
    } else {
      setError("Failed to fetch data! This may be due to network issues.");
    }
  };

  const handleDenyRequest = () => setShowDenyConfirmation(true);
  const handleApproveRequest = () => setShowApproveConfirmation(true);

  const handleConfirm = (approved) => {
    setShowApproveConfirmation(false);
    setShowDenyConfirmation(false);
    setIsPending(true);
    if (approved) {
      const newPresident = {
        firstName: request.firstName,
        lastName: request.lastName,
        cin: request.cin,
        phoneNumber: request.phoneNumber,
        email: request.email,
        password: "pass123",
        clubName: request.clubName,
      };
      axios
        .post("/api/users/president/add", newPresident)
        .then((response) => {
          console.log("President added successfully");
        })
        .catch((error) => {
          console.error("Error adding president:", error);
        });
    }
    axios
      .delete(`/api/users/signup/request/delete?id=${id}`)
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
        {request && (
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
                    {request.firstName} {request.lastName}
                  </h2>
                </Col>
                <Col lg={5} md={5} className="profile-data">
                  <h3>
                    <strong>Club Name:</strong> {request.clubName}
                  </h3>
                  <h3>
                    <strong>CIN:</strong> {request.cin}
                  </h3>
                  <h3>
                    <strong>Phone Number:</strong> {request.phoneNumber}
                  </h3>
                  <h3>
                    <strong>Email:</strong> {request.email}
                  </h3>
                  <h5 id="expiration-date">
                    This request was submitted on{" "}
                    {new Date(request.createdAt).toLocaleDateString("en-GB")} at{" "}
                    {new Date(request.createdAt).toLocaleTimeString("en-GB")}
                  </h5>
                </Col>
                <Col className="controls">
                  <button id="deny-request" onClick={handleDenyRequest}>
                    Deny Request
                  </button>
                  <button id="approve-request" onClick={handleApproveRequest}>
                    Approve Request
                  </button>
                </Col>
              </Row>
            </Row>

            {/* Modal to confirm denying the request */}
            <Modal
              show={showDenyConfirmation}
              onHide={() => setShowDenyConfirmation(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <h2>Confirmation</h2>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <strong>
                  Are you sure you want to deny this signup request?
                </strong>
                <br />
                *The request sender will be notified via email.
                <br />
                This request will be deleted permanently from the database.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowDenyConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => handleConfirm(false)}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal to confirm approving the request */}
            <Modal
              show={showApproveConfirmation}
              onHide={() => setShowApproveConfirmation(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <h2>Confirmation</h2>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <strong>
                  Are you sure you want to approve this signup request?
                </strong>
                <br />
                *The request sender will be notified via email.
                <br />
                The sender will be added to the database as a club president,
                and the system will automatically assign a random password to
                them.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowApproveConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button variant="success" onClick={() => handleConfirm(true)}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Row>
    </Container>
  );
};

export default SignupRequestDetails;
