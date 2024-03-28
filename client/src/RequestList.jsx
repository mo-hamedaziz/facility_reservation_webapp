import './RequestList.css'; 
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col, Container } from 'react-bootstrap';
import React, { useRef } from 'react'; 

const RequestList = () => {
    const [refresh, setRefresh] = useState(false); // State variable to trigger refresh
    const [selectedDate, setSelectedDate] = useState(new Date()); // State variable to store selected date
    const {data:requests, isPending, error} = useFetch('http://localhost:3333/requests', refresh);
    // Pass the 'refresh' state variable to the 'useFetch' hook

    const handleRefresh = () => {
        setRefresh(!refresh); // Toggle the refresh state
    };

    const handleDateChange = (date) => {
        setSelectedDate(date); // Update selected date
    };

    const locations = ['151', '153', '155', 'Salle Samsung', 'SL', 'Audito'];

    // Refs for each option
    const allRef = useRef();
    const pendingRef = useRef();
    const approvedRef = useRef();
    const deniedRef = useRef();

    // Function to toggle selected class for each option
    const toggleSelected = (ref) => {
        allRef.current.classList.remove('selected');
        pendingRef.current.classList.remove('selected');
        approvedRef.current.classList.remove('selected');
        deniedRef.current.classList.remove('selected');
        ref.current.classList.add('selected');
        console.log(ref.current.innerHTML);
    };

    useEffect(() => {
        // Apply selected class to "All" option when component mounts
        toggleSelected(allRef);
    }, []);

    return ( 
        <>
        <Container>
            <Row className="filtering">
                <Row>
                    <Col className="select-date"> 
                            <Form.Label>Select a specific day: </Form.Label>
                            <DatePicker 
                                id="date"
                                dateFormat="yyyy/MM/dd"
                                selected={selectedDate}
                                onChange={handleDateChange}
                            />
                        </Col>
                        <Col className="select-location">
                            <Form.Label>Select a specific location:  </Form.Label>
                            <Form.Select className="form-select">
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col className="sort-by-select"> {/* Dropdown select menu for 'sort by' */}
                            <Form.Label>Sort By:  </Form.Label>
                            <Form.Select className="form-select">
                                <option value="event-date">Event Date</option>
                                <option value="event-type">Event Type</option>
                                <option value="club-name">Club Name</option>
                                <option value="location">Location</option>
                            </Form.Select>
                        </Col>
                        {/* Button to trigger refresh */}
                        <Col className="refresh-btn">
                            <button onClick={handleRefresh}>Refresh List</button>
                        </Col>
                </Row>
                <Row>
                    <Col xs={6} className="show">
                        <Row>
                            <Col xs={2} className="label">Show:  </Col>
                            <Col ref={allRef} className="option all-request" onClick={() => toggleSelected(allRef)}>All</Col>
                            <Col ref={pendingRef} className="option pending-request" onClick={() => toggleSelected(pendingRef)}>Pending</Col>
                            <Col ref={approvedRef} className="option approved-request" onClick={() => toggleSelected(approvedRef)}>Approved</Col>
                            <Col ref={deniedRef} className="option denied-request" onClick={() => toggleSelected(deniedRef)}>Denied</Col>
                        </Row>
                    </Col>
                    <Col className="note">
                        <p>*Note: if the -sort by date- is selected, then the -select a specific date- will be ignored in the database query, same for the location</p>
                    </Col>
                </Row>
            </Row>
            <br /><br /><br />
            <Row className="fetching">
                {error && <div>{error}</div>}
                {isPending && <div>Loading ...</div>}
                {requests && <h2 id="number-of-requests">Number of requests: {requests.length}</h2> }
                {requests && 
                        <div className="rendered-list">
                            {requests.map((request) => (
                                <div className={`request-preview ${getRequestStatusClass(request.status)}`} key={request.id} title="Consult this request">
                                    <Link to={`/request/${request.id}`}>
                                        <h2>{request.eventName} ( {request.eventType} )</h2>
                                        <p><span className="bold">Sent by: </span> {request.sender} - {request.clubName}</p>
                                        <p><span className="bold">Date: </span>{ request.date } - { request.time }</p>
                                        <p><span className="bold">Location: </span>{ request.classroom }</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                }
            </Row>
        </Container>
        </>
     );
}

// Function to determine the class based on the request status
const getRequestStatusClass = (status) => {
    switch(status) {
        case "Pending":
            return "pending-request";
        case "Approved":
            return "approved-request";
        case "Denied":
            return "denied-request";
        default:
            return "pending-request";
    }
}
 
export default RequestList;
