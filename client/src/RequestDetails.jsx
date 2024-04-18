import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./RequestDetails.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const RequestDetails = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const id = searchParams.get("id");

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
  
    html2canvas(input, {scale:1.1})
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save(`${request.event.name} request.pdf`);
      })
      .catch((error) => {
        setError("Error generating PDF");
      });
  };

  const fetchData = () => {
    setIsPending(true);
    axios
      .get(`/api/booking/request/details?id=${id}`)
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
      if (error.response.status === 404) {
        setError("404: The request was NOT FOUND on the server !");
      } else if (error.response.status === 500) {
        setError("500: Internal Server Error !");
      }
    } else if (error.request) {
      setError("Failed to fetch data !\nNo response received from the server.");
    } else {
      setError("Failed to fetch data !\nThis may be due to network issues.");
    }
  };

  const handleUpdateRequest = async (action) => {
    try {
      const updatedStatus = action === "approve" ? "Approved" : "Denied";
      await axios.patch(`/api/booking/request/details?id=${id}`, {
        status: updatedStatus,
      });
      navigate("/request/list");
    } catch (error) {
      console.error("Error occurred while updating the request:", error);
      setError(
        "Error occurred while updating the request. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Container className="request-details">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {error && <div className="error-msg">{error}</div>}
          {isPending && <h2 className="loading-screen">Loading ...</h2>}
          {
            <button
              className="go-back-to-list-btn"
              onClick={() => navigate("/request/list")}
            >
              <img src="/images/leftArrow.svg" alt="Go back to the list" />
              Go back to the list
            </button>
          }
          {request && (
            <>
              <article className="details" id="pdf-content">
                <h1>{request.event.name}</h1>
                <p>
                  <strong>Sent By:</strong> {request.sender.firstName}{" "}
                  {request.sender.lastName}
                </p>
                <p>
                  <strong>Club Name: </strong>
                  {request.sender.clubName}
                </p>
                <p>
                  <strong>This request was submitted at:</strong>{" "}
                  {new Date(request.createdAt).toLocaleString("en-GB")}
                </p>
                <p>
                  <strong>Status: </strong> {request.status}
                </p>
                <hr />
                <p>
                  <strong>Event Type:</strong> {request.event.type}
                </p>
                <p>
                  <strong>Event Date:</strong>{" "}
                  {new Date(request.event.date).toLocaleDateString("en-GB")}
                </p>
                <p>
                  <strong>Event Duration:</strong> {request.event.time}
                </p>
                <p>
                  <strong>Participants Count:</strong>{" "}
                  {request.event.number_of_participants}
                </p>
                <p>
                  <strong>Requested Classrom:</strong> Salle{" "}
                  {request.requested_classroom.name}
                </p>
                <hr />
                <h3>Event Description:</h3>
                <p id="evDesc">{request.event.description}</p>
                <hr />
                <p>
                  <strong>Attachments:</strong> {request.attachment} (Feature to
                  be added soon). <a href="#">Download now.</a>
                </p>
                <hr />
                <strong>The club president has left this comment:</strong>
                <p id="comment">{request.comment}</p>
                <br />
              </article>
              <div className="controls">
                <Button id="download-details" onClick={generatePDF}>
                  Download request as PDF
                </Button>
                <div className="button-group">
                  <Button
                    onClick={() => handleUpdateRequest("approve")}
                    disabled={request.status === "Approved"}
                    id="approve-req"
                  >
                    Approve
                  </Button>{" "}
                  <Button
                    onClick={() => handleUpdateRequest("deny")}
                    disabled={request.status === "Denied"}
                    id="deny-req"
                  >
                    Deny
                  </Button>{" "}
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RequestDetails;
