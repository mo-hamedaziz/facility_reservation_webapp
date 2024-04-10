import React, { useState, useEffect, useRef } from "react";
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

  const allRef = useRef();
  const pendingRef = useRef();
  const approvedRef = useRef();
  const deniedRef = useRef();

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleSpecificDaySwitchChange = (e) => {
    const isChecked = e.target.checked; // Determine if the switch is checked or not

    setSpecificDaySwitch(isChecked); // Update the state based on the switch state

    // Filter requests based on the selected date if the switch is checked
    filterRequestsByDay(isChecked ? selectedDate : null);
  };

  const handleSelectSpecificDay = (date) => {
    setSelectedDate(date);

    // Filter requests based on the selected date if the switch is on
    if (specificDaySwitch) {
      filterRequestsByDay(date);
    }
  };

  const filterRequestsByDay = (date) => {
    const filteredRequests = date
      ? data.originalRequests.filter(
          (request) =>
            new Date(request._event.date).toLocaleDateString("en-GB") ===
            new Date(date).toLocaleDateString("en-GB")
        )
      : data.originalRequests;

    // Update the state with the filtered requests
    setData({
      ...data,
      filteredRequests: filteredRequests,
    });
  };

  const handleSortChange = (sortByOption) => {
    document.getElementById("specific-location-selector").value =
      "any-location";
    setSpecificDaySwitch(false);

    const sortedRequests = [...data.originalRequests];

    switch (sortByOption) {
      case "event-date":
        sortedRequests.sort(
          (a, b) => new Date(a._event.date) - new Date(b._event.date)
        );
        break;
      case "event-type":
        sortedRequests.sort((a, b) =>
          a._event.type.localeCompare(b._event.type)
        );
        break;
      case "club-name":
        sortedRequests.sort((a, b) =>
          a._sender.clubName.localeCompare(b._sender.clubName)
        );
        break;
      case "location":
        sortedRequests.sort((a, b) =>
          a._requested_classroom.name.localeCompare(b._requested_classroom.name)
        );
        break;
      default:
        sortedRequests.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
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
        (request) => request._requested_classroom.name === selectedLocation
      );
    }

    setData({
      ...data,
      filteredRequests: filteredRequests,
    });
  };

  const toggleSelected = (ref, showOption) => {
    [allRef, pendingRef, approvedRef, deniedRef].forEach((r) =>
      r.current.classList.remove("selected")
    );
    ref.current.classList.add("selected");
    useAxiosGet(showOption);

    // Set default values for all Form.Select elements
    const selects = document.querySelectorAll(".form-select");
    selects.forEach((select) => {
      // Find the default option with the value equal to "any-location" or "submission-time"
      const defaultOption =
        select.querySelector("option[value='any-location']") ||
        select.querySelector("option[value='submission-time']");
      if (defaultOption) {
        defaultOption.selected = true; // Select the default option
      }
    });
    // Set the specific day switch to be off
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
    toggleSelected(allRef, "all");
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
                checked={specificDaySwitch} // Bind the checked state to the switch state
                onChange={handleSpecificDaySwitchChange} // Handle switch change
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
                  ref={
                    status === "all"
                      ? allRef
                      : status === "pending"
                      ? pendingRef
                      : status === "approved"
                      ? approvedRef
                      : deniedRef
                  }
                  className={`option ${status}-request`}
                  onClick={() =>
                    toggleSelected(
                      status === "all"
                        ? allRef
                        : status === "pending"
                        ? pendingRef
                        : status === "approved"
                        ? approvedRef
                        : deniedRef,
                      status
                    )
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Col>
              ))}
            </Row>
          </Col>
          <Col className="note">
            <p>
              <strong>*Note:</strong> When a -sorting- option is selected, it
              will automatically disabled all the filtering by day and by
              location.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
          <p>
            <strong>*Note:</strong> When a -show- option is selected, it will
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
        {data.filteredRequests && (
          <div className="rendered-list">
            {data.filteredRequests.map((request, index) => (
              <div
                key={index}
                className={`request-preview ${getRequestStatusClass(
                  request.status
                )}`}
                title="Consult this request"
              >
                <Link to={`/request/${request._id}`}>
                  <h2>
                    {request._event.name} ({request._event.type})
                  </h2>
                  <p>
                    <span className="bold">Sent by:</span>{" "}
                    {request._sender.firstName} {request._sender.lastName} -{" "}
                    {request._sender.clubName}
                  </p>
                  <p>
                    <span className="bold">Date:</span>{" "}
                    {new Date(request._event.date).toLocaleDateString("en-GB")}{" "}
                    ({request._event.time})
                  </p>
                  <p>
                    <span className="bold">Location:</span>{" "}
                    {request._requested_classroom.name}
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
