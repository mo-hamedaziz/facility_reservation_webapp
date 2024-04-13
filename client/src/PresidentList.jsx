import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container, Spinner } from "react-bootstrap";

const PresidentList = () => {
  const [presidentList, setPresidentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/president/list`);
        setPresidentList(response.data);
        setError(null);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleError = (error) => {
    let errorMessage = "Failed to fetch data !";

    if (error.response) {
      if (error.response.status === 500) {
        errorMessage += "\n500: Internal Server Error !";
      }
    } else if (error.request) {
      errorMessage += "\nNo response received from the server.";
    } else {
      errorMessage += "\nThis may be due to network issues.";
    }

    setError(errorMessage);
  };

  return (
    <Container>
      <Row className="fetching">
        {error && <div className="error-msg">{error}</div>}
        {loading && (
          <div className="loading-screen">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {presidentList.length > 0 && !error && (
          <div className="rendered-list">
            <p>
              <strong>
                Total number of subscribed presidents: {presidentList.length}
              </strong>
            </p>
            {presidentList.map((president) => (
              <div className="preview" key={president._id}>
                <Row>
                  <Col xs={1} className="profile-picture">
                    <img
                      src="/images/anonymousProfilePicture.svg"
                      alt="Profile Picture"
                    />
                  </Col>
                  <Col xs={8}>
                    <h2>
                      {president.firstName} {president.lastName}
                    </h2>
                    <p>
                      <strong>Club: </strong> {president.clubName}
                    </p>
                  </Col>
                  <Col xs={3} className="manage">
                    <Link to={`/users/president/details?id=${president._id}`}>
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

export default PresidentList;