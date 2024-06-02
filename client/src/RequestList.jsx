import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import "./RequestList.css";
import RenderedRequestList from "./RenderedRequestList";

const RequestList = () => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const show = searchParams.get("show") || "all";
  const id = searchParams.get("id");
  const [selectedStatus, setSelectedStatus] = useState(show);
  const allowedValues = ["all", "pending", "approved", "denied"];

  const [data, setData] = useState({
    locations: [],
    originalRequests: [],
    filteredRequests: [],
    isLoading: true,
    error: null,
  });

  const [specificDaySwitch, setSpecificDaySwitch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const toggleSelected = (status, id) => {
    if (!allowedValues.includes(status)) {
      status = "all";
    }
    setSelectedStatus(status);
    navigate(`/request/list${!id ? "?show=" : `?id=${id}&show=`}${status}`, {
      replace: true,
    });
    useAxiosGet(status, id);
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

  const useAxiosGet = (showOption, id) => {
    const apiUrl = !id
      ? `/api/booking/request/list?show=${showOption}`
      : `/api/booking/request/list?id=${id}&show=${showOption}`;

    setData({
      ...data,
      isLoading: true,
      error: null,
    });

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
      .catch((error) => {
        let errorMessage = "An error occurred while fetching data.";

        if (error.response) {
          errorMessage = `Server responded with ${error.response.status}.\n${error.response.data.errMsg}`;
        } else if (error.request) {
          errorMessage = "No response received from the server.";
        } else {
          errorMessage = "Error setting up the request.";
        }
        setData({
          ...data,
          isLoading: false,
          error: errorMessage,
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await toggleSelected(show, id);
    };
    fetchData();
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
                disabled={data.originalRequests.length === 0}
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
              disabled={data.originalRequests.length === 0}
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
              disabled={data.originalRequests.length === 0}
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
      <Row className="fetching">
        {data.error && <div className="error-msg">{data.error}</div>}
        {data.isLoading && <h2 className="loading-screen">Loading ...</h2>}
        {!data.isLoading && !data.error && (
          <RenderedRequestList
            data={data}
            getRequestStatusClass={getRequestStatusClass}
          />
        )}
      </Row>
    </Container>
  );
};

export default RequestList;
