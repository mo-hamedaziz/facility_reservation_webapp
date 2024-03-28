import './PresidentDetails.css'
import useFetch from './useFetch';
import { useParams } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PresidentDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { data: president, isPending, error } = useFetch('http://localhost:3333/presidents/' + id);

    const handleClick = () => {
        navigate('/users');
    }

    return ( 
        <Container className="rendering-details">
            <Row>
                    {error && <h1>President Not Found on the Server</h1> }
                    {isPending && <div>Loading ...</div>}
                    {president &&
                        <>
                        <Row className='details-card'>
                            <Row>
                                <Col xs={2} className='back-to-list'>
                                    <button onClick={handleClick}>Back to List</button>
                                </Col>
                            </Row>
                            <Row className='details'>
                                <Col xs={3} className='picture-and-name'>
                                    <img className='detailed-profile-picture' src="/images/anonymousProfilePicture.svg" alt="Profile Picture" />
                                    <h2>{president.firstName} {president.lastName}</h2>
                                </Col>
                                <Col xs={5} className='profile-data'>
                                    <h3><strong>Club Name: </strong>{president.clubName}</h3>
                                    <h3><strong>CIN: </strong>{president.cin}</h3>
                                    <h3><strong>Phone Number: </strong>{president.phoneNumber}</h3>
                                    <h3><strong>Email: </strong>{president.email}</h3>
                                </Col>
                                <Col className='controls'>
                                    <button id='view-requests'>View Requests</button>
                                    <button id='delete-user'>Delete User</button>
                                </Col>
                            </Row>
                        </Row>
                            
                        </>
                    }
            </Row>
        </Container>
     );
}
 
export default PresidentDetails;