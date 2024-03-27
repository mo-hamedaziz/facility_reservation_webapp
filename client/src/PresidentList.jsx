import './PresidentList.css'; 
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from 'react-bootstrap';


const PresidentList = () => {
    const [refresh, setRefresh] = useState(null); // State variable to trigger refresh
    const {data:presidents, isPending, error} = useFetch('http://192.168.1.189:3333/presidents', refresh);
    // Pass the 'refresh' state variable to the 'useFetch' hook

    return ( 
        <>
        <Container>
            <Row className="fetching">
                {error && <div>{error}</div>}
                {isPending && <div>Loading ...</div>}
                {presidents && 
                    <>
                    <h2 id="number-of-presidents">Total number of presidents: {presidents.length}</h2>
                    <div className="rendered-list">
                        {presidents.map((president) => (
                            <div className="president-preview" key={president.id} title="See president">
                                <Row>
                                    <Col xs={1} className='profile-picture'>
                                        <img src="../public/images/anonymousProfilePicture.svg" alt="Profile Picture" />
                                    </Col>
                                    <Col >
                                        <h2>{president.firstName} {president.lastName}</h2>
                                        <p><strong>Club: </strong> {president.clubName}</p>
                                    </Col>
                                    <Col xs={2} className='manage-profile'>
                                        <Link to={`/account/president/${president.id}`}>
                                            <Row>
                                                <Col className='manage-label'>See Details</Col>
                                                <Col className='manage-arrow'>
                                                    <img src="../public/images/rightArrow.svg" alt="" />
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
