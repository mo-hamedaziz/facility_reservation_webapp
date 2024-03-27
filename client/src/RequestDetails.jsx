import './RequestDetails.css'; 
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import useFetch from "./useFetch";

const RequestDetails = () => {
    const { id } = useParams();
    const { data: request, isPending, error, refetch } = useFetch('http://192.168.1.189:3333/requests/' + id);
    const navigate = useNavigate();

    const handleClick = async (action) => {
        try {
            // Perform the action (approve or deny) here
            // For example:
            if (action === 'approve') {
                // Perform approve action
                await approveRequest(id);
            } else if (action === 'deny') {
                // Perform deny action
                await denyRequest(id);
            }
            // Refetch data after action is performed
            refetch();
        } catch (error) {
            console.error('Error occurred when approving/denying the request:', error);
        }
    }

    const approveRequest = async (id) => {
        // Implement API call to approve request
    }

    const denyRequest = async (id) => {
        // Implement API call to deny request
    }

    return (
        <Container className="request-details">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    {error && <h1>Request Not Found on the Server</h1> }
                    {isPending && <div>Loading ...</div>}
                    {request &&
                        <>
                        <article className='details'>
                            <h1>{request.eventName}</h1>
                            <p><strong>Sent By:</strong> {request.sender} - {request.clubName}</p>
                            <p><strong>This request was submitted at:</strong> {request.submissionTime}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            <hr />
                            <p><strong>Event Type:</strong> {request.eventType}</p>
                            <p><strong>Event Date:</strong> {request.date}</p>
                            <p><strong>Event Time:</strong> {request.time}</p>
                            <p><strong>Participants Count:</strong> {request.participantsCount}</p>
                            <hr />
                            <h3>Event Description:</h3>
                            <p id='evDesc'>{request.eventDescription}</p>
                            <hr />
                            <p><strong>Attachments:</strong> {request.attachment}</p>
                            <hr />
                            <strong>The club president has left this comment:</strong>
                            <p id='comment'>{request.comment}</p>
                            <br />
                            
                        </article>
                        <div className="controls">
                            <Button id='download-details'>Download request as PDF</Button>
                            <div className="button-group">
                                {request.status === 'Pending' && (
                                    <>
                                        <Button onClick={() => handleClick('approve')} id='approve-req'>Approve</Button>{' '}
                                        <Button onClick={() => handleClick('deny')} id='deny-req'>Deny</Button>{' '}
                                    </>
                                )}
                                {request.status === 'Approved' && (
                                    <>
                                        <Button disabled id='approve-req'>Approve</Button>{' '}
                                        <Button onClick={() => handleClick('deny')} id='deny-req'>Deny</Button>{' '}
                                    </>
                                )}
                                {request.status === 'Denied' && (
                                    <>
                                        <Button onClick={() => handleClick('approve')} id='approve-req'>Approve</Button>{' '}
                                        <Button disabled id='deny-req'>Deny</Button>{' '}
                                    </>
                                )}
                            </div>
                        </div>
                        </>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default RequestDetails;
