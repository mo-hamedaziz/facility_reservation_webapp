import { useEffect, useState } from "react";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const SignupRequests = () => {
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get("/api/users/signup/request/list")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("The response from the server was corrupted !");
        }
        setRequestList(response.data);
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  }, []);

  const handleError = (error) => {
    if (error.response) {
      setError(error.response.data.error);
    } else if (error.request) {
      setError("No response received from the server.");
    } else {
      setError("Error: " + error.message);
    }
  };

  return (
    <Container>
      <Row className="fetching">
        {loading && (
          <Col className="text-center">
            <Spinner animation="border" role="status">
            </Spinner>
            <h2 className="loading-screen">Loading sign-up requests...</h2>
          </Col>
        )}
        {error && <div className="error-msg">{error}</div>}
        {!loading && !error && requestList.length === 0 && (
          <Col className="text-center">
            <p>No sign-up requests found.</p>
          </Col>
        )}
        {!loading && !error && requestList.length > 0 && (
          <div className="rendered-list">
            <p>
              <strong>
                Total number of requested sign-ups: {requestList.length}
              </strong>
            </p>
            {requestList.map((signup_request) => (
              <div className="preview" key={signup_request._id}>
                <Row>
                  <Col xs={1} className="profile-picture">
                    <img
                      src="/images/anonymousProfilePicture.svg"
                      alt="Profile Picture"
                    />
                  </Col>
                  <Col xs={8}>
                    <h2>
                      {signup_request.firstName} {signup_request.lastName}
                    </h2>
                    <p>
                      <strong>Club: </strong> {signup_request.clubName}
                    </p>
                    <p>
                      <strong>Submission Time: </strong>
                      {new Date(signup_request.createdAt).toLocaleString(
                        "en-GB"
                      )}
                    </p>
                  </Col>
                  <Col xs={3} className="manage">
                    <Link to={`/users/signup/request/details?id=${signup_request._id}`}>
                      <Row>
                        <Col className="manage-label">See Details</Col>
                        <Col className="manage-arrow">
                          <img src="/images/rightArrow.svg" alt="" />
                        </Col>
                      </Row>
                    </Link>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default SignupRequests;
