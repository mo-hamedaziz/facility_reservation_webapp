import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import { Row, Col, Container } from 'react-bootstrap';


const PresidentList = () => {
    const {data:presidents, isPending, error} = useFetch('http://localhost:3333/presidents');
    // Pass the 'refresh' state variable to the 'useFetch' hook

    return ( 
        <>
        <Container>
            <Row className="fetching">
                {error && <div>{error}</div>}
                {isPending && <div>Loading ...</div>}
                {presidents && 
                    <>
                    {/*<h2 id="number-of-presidents">Total number of subscribed presidents: {presidents.length}</h2>*/}
                    <div className="rendered-list">
                        <p>Total number of subscribed presidents: {presidents.length}</p>
                        {presidents.map((president) => (
                            <div className="preview" key={president.id}>
                                <Row>
                                    <Col xs={1} className='profile-picture'>
                                        <img src="/images/anonymousProfilePicture.svg" alt="Profile Picture" />
                                    </Col>
                                    <Col xs={8}>
                                        <h2>{president.firstName} {president.lastName}</h2>
                                        <p><strong>Club: </strong> {president.clubName}</p>
                                    </Col>
                                    <Col xs={3} className='manage'>
                                        <Link to={`/account/president/${president.id}`}>
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
 
export default PresidentList;