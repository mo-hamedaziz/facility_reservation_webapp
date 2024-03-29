import './RequestDetails.css';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import useFetch from "./useFetch";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestDetails = () => {
    const navigate= useNavigate();

    const { id } = useParams();
    const { data: signup_request, isPending, error } = useFetch('http://localhost:3333/signup_requests/' + id);

    const { data: presidents } = useFetch('http://localhost:3333/presidents');
    const isPresidentExists = presidents && presidents.some(president => president.clubName === signup_request?.clubName);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeny = () => {
        // Show confirmation modal before deleting
        setShowConfirmation(true);
    };

    const handleApprove = async () => {
        try {
            // Fetch the president's data associated with the signup request
            const presidentData = {
                firstName: signup_request.firstName,
                lastName: signup_request.lastName,
                clubName: signup_request.clubName,
                email: signup_request.email,
                phoneNumber: signup_request.phoneNumber,
            };

            // Send a POST request to insert the new president
            const response = await fetch('http://localhost:3333/presidents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(presidentData)
            });

            if (!response.ok) {
                throw new Error('Failed to insert the new account');
            }

            // Delete the signup request from the list of signup requests
            await fetch(`http://localhost:3333/signup_requests/${id}`, {
                method: 'DELETE'
            });

            // Navigate to the desired page
            navigate('/users');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const confirmDenyRequest = () => {
        fetch(
            `http://localhost:3333/signup_requests/${id}`, {
            method: 'DELETE',
        }
        );
        navigate('/users');
        setShowConfirmation(false); // Close the confirmation modal
    };

    return (
        <Container className="request-details">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    {error && <h1>Request Not Found on the Server</h1>}
                    {isPending && <div>Loading ...</div>}
                    {signup_request &&
                        <>
                            <article className='details'>
                                <h2><strong>Sent By: </strong> {signup_request.firstName} {signup_request.lastName}</h2><br />
                                <p><strong>Club Name: </strong> {signup_request.clubName}</p>
                                <p><strong>Club members count: </strong> to be added soon</p>
                                <p><strong>This request was submitted at: </strong> {new Date(signup_request.submissionTime).toLocaleString()}</p>
                                <hr />
                                <h5><strong>Sender Info:</strong></h5>
                                <p><strong>Start of Mandate: </strong> {signup_request.startOfMandate}</p>
                                <p><strong>Email: </strong> {signup_request.email}</p>
                                <p><strong>Phone Number: </strong> {signup_request.phoneNumber}</p>
                                <p><strong>Class: </strong> RT3 - to be added soon</p>
                                <hr />
                                <p><strong>Attachments:</strong> to be added soon</p>
                                <hr />
                                <strong>The club president has left this comment:</strong>
                                <p id='comment'>{signup_request.comment}</p>
                                <hr />
                                <div className="leave-comment">
                                    <strong>Leave a comment:</strong><br />
                                    <textarea
                                        name="comment-field"
                                        id="comment-field"
                                    ></textarea>
                                </div>
                                <br />
                                {isPresidentExists &&
                                    <div className='warning'>
                                        There is a registered account within the same club already !
                                    </div>
                                }
                            </article>
                            <div className="controls">
                                <div className="button-group">
                                    <button id='approve-req' onClick={handleApprove}>Approve</button>
                                    <button id='deny-req' onClick={handleDeny}>Deny</button>
                                </div>
                                <p>*The request sender will be notified by your response.</p>
                            </div>
                        </>
                    }
                </Col>
            </Row>
            {/* Confirmation Modal */}
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title><h2>Confirmation</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body><strong>Are you sure you want to deny this request?</strong><br />If so, this request will be deleted.<br />*The request sender will be notified via email.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDenyRequest}>
                        Deny Request
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default RequestDetails;
