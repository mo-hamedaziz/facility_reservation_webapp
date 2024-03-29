import useFetch from './useFetch';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignupRequests = () => {

    const {data:signup_requests, isPending, error} = useFetch('http://localhost:3333/signup_requests');

    return ( 
        <>
        <Container>
            <Row className="fetching">
                {error && <div>{error}</div>}
                {isPending && <div>Loading ...</div>}
                {signup_requests && 
                    <>
                    <div className="rendered-list">
                        <p>Total number of requested signups: {signup_requests.length}</p>
                        {signup_requests.map((signup_request) => (
                            <div className="preview" key={signup_request.id}>
                                <Row>
                                    <Col xs={1} className='profile-picture'>
                                        <img src="/images/anonymousProfilePicture.svg" alt="Profile Picture" />
                                    </Col>
                                    <Col xs={8}>
                                        <h2>{signup_request.firstName} {signup_request.lastName}</h2>
                                        <p><strong>Club: </strong> {signup_request.clubName}</p>
                                        <p><strong>Submission Time: </strong>{new Date(signup_request.submissionTime).toLocaleString()}</p>
                                    </Col>
                                    <Col xs={3} className='manage'>
                                        <Link to={`/signups/requests/${signup_request.id}`}>
                                            <Row>
                                                <Col className='manage-label'>See Details</Col>
                                                <Col className='manage-arrow'>
                                                    <img src="/images/rightArrow.svg" alt="" />
                                                </Col>
                                            </Row>
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                    </>
                }
            </Row>
        </Container>
        </>
     );
}
 
export default SignupRequests;