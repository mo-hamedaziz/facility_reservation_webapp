import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import TimeAgo from "react-timeago";
import "./RequestList.css";

const RequestList = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState({
    locations: [],
    originalRequests: [],
    filteredRequests: [],
    isLoading: true,
    error: null,
  });
  const [specificDaySwitch, setSpecificDaySwitch] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleSpecificDaySwitchChange = (e) => {
    const isChecked = e.target.checked;
    setSpecificDaySwitch(isChecked);
    filterRequestsByDay(isChecked ? selectedDate : null);
  };

  const handleSelectSpecificDay = (date) => {
    setSelectedDate(date);
    if (specificDaySwitch) {
      filterRequestsByDay(date);
    }
  };

  const filterRequestsByDay = (date) => {
    const filteredRequests = date
      ? data.originalRequests.filter(
          (request) =>
            new Date(request.event.date).toLocaleDateString("en-GB") ===
            new Date(date).toLocaleDateString("en-GB")
        )
      : data.originalRequests;
    setData({
      ...data,
      filteredRequests: filteredRequests,
    });
  };

  const handleSortChange = (sortByOption) => {
    setSelectedStatus("all");
    const sortedRequests = [...data.originalRequests];
    switch (sortByOption) {
      case "event-date":
        sortedRequests.sort(
          (a, b) => new Date(a.event.date) - new Date(b.event.date)
        );
        break;
      case "event-type":
        sortedRequests.sort((a, b) => a.event.type.localeCompare(b.event.type));
        break;
      case "club-name":
        sortedRequests.sort((a, b) =>
          a.sender.clubName.localeCompare(b.sender.clubName)
        );
        break;
      case "location":
        sortedRequests.sort((a, b) =>
          a.requested_classroom.name.localeCompare(b.requested_classroom.name)
        );
        break;
      default:
        sortedRequests.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
    }
    setData({
      ...data,
      filteredRequests: sortedRequests,
    });
  };

  const handleSelectSpecificLocation = (selectedLocation) => {
    let filteredRequests = data.originalRequests;
    if (selectedLocation !== "any-location") {
      filteredRequests = data.originalRequests.filter(
        (request) => request.requested_classroom.name === selectedLocation
      );
    }
    setData({
      ...data,
      filteredRequests: filteredRequests,
    });
  };

  const toggleSelected = (status) => {
    setSelectedStatus(status);
    useAxiosGet(status);
    setSpecificDaySwitch(false);
  };

  const getRequestStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "pending-request";
      case "Approved":
        return "approved-request";
      case "Denied":
        return "denied-request";
      default:
        return "pending-request";
    }
  };

  const useAxiosGet = (showOption) => {
    setData({
      ...data,
      isLoading: true,
      error: null,
    });
    const apiUrl = `/api/booking/request/list?show=${showOption}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setData({
          locations: response.data.locations,
          originalRequests: response.data.requests,
          filteredRequests: response.data.requests,
          isLoading: false,
          error: null,
        });
      })
      .catch(() => {
        setData({
          ...data,
          isLoading: false,
          error: "Error has occurred while trying to fetch data!",
        });
      });
  };

  useEffect(() => {
    useAxiosGet(selectedStatus);
  }, [refresh]);

  return (
    <Container>
      <Row className="filtering">
        <Row>
          <Col className="select-date">
            <Form.Label>
              <Form.Check
                type="switch"
                id="select-specific-day-switch"
                label="Select a specific day:"
                checked={specificDaySwitch}
                onChange={handleSpecificDaySwitchChange}
              />
            </Form.Label>
            <DatePicker
              id="specific-day-selector"
              dateFormat="dd/MM/yyyy"
              selected={selectedDate}
              onChange={handleSelectSpecificDay}
              disabled={!specificDaySwitch}
            />
          </Col>
          <Col className="select-location">
            <Form.Label>Select a specific location:</Form.Label>
            <Form.Select
              className="form-select"
              id="specific-location-selector"
              onChange={(e) => {
                handleSelectSpecificLocation(e.target.value);
              }}
            >
              <option value="any-location">Any</option>
              {data.locations.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col className="sort-by-select">
            <Form.Label>Sort By:</Form.Label>
            <Form.Select
              className="form-select"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="submission-time">Submission Time (Default)</option>
              <option value="event-date">Event Date</option>
              <option value="event-type">Event Type</option>
              <option value="club-name">Club Name</option>
              <option value="location">Location</option>
            </Form.Select>
          </Col>
          <Col className="refresh-btn">
            <button onClick={handleRefresh}>Refresh List</button>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="show">
            <Row>
              <Col xs={2} className="label">
                Show:
              </Col>
              {["all", "pending", "approved", "denied"].map((status, index) => (
                <Col
                  key={index}
                  className={`option ${status}-request ${
                    status === selectedStatus ? "selected" : ""
                  }`}
                  onClick={() => toggleSelected(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Col>
              ))}
            </Row>
          </Col>
          <Col className="note">
            <p>
              <strong>*Note:</strong> When a sorting option is selected, it will
              automatically disable all the filtering by day and by location.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <p>
              <strong>*Note:</strong> When a show option is selected, it will
              automatically disable sorting and filtering.
            </p>
          </Col>
          <Col></Col>
        </Row>
      </Row>
      <br />
      <Row className="fetching">
        {data.error && <div className="error-msg">{data.error}</div>}
        {data.isLoading && <h2 className="loading-screen">Loading ...</h2>}
        {!data.isLoading && !data.error && (
          <h2 id="number-of-requests">
            Number of requests: {data.filteredRequests.length}
          </h2>
        )}
        {!data.isLoading && !data.error && data.filteredRequests && (
          <div className="rendered-list">
            {data.filteredRequests.map((request) => (
              <div
                key={request._id}
                className={`request-preview ${getRequestStatusClass(
                  request.status
                )}`}
                title="Consult this request"
              >
                <Link to={`/request/details?id=${request._id}`}>
                  <h2>
                    {request.event.name} ({request.event.type})
                  </h2>
                  <p>
                    <span className="bold">Sent by:</span>{" "}
                    {request.sender.firstName} {request.sender.lastName} -{" "}
                    {request.sender.clubName}
                  </p>
                  <p>
                    <span className="bold">Date:</span>{" "}
                    {new Date(request.event.date).toLocaleDateString("en-GB")} (
                    {request.event.time})
                  </p>
                  <p>
                    <span className="bold">Location:</span>{" "}
                    {request.requested_classroom.name}
                  </p>
                  <p className="time-ago">
                    *Was submitted{" "}
                    <TimeAgo
                      date={new Date(request.createdAt).toLocaleString()}
                    />
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default RequestList;
