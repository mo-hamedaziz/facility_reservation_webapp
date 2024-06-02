import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

const RenderedRequestList = ({ data, getRequestStatusClass }) => {
  return (
    <div className="rendered-list">
      <h2 id="number-of-requests">
        Number of requests: {data.filteredRequests.length}
      </h2>
      <br />
      {data.filteredRequests.map((request) => (
        <div
          key={request._id}
          className={`request-preview ${getRequestStatusClass(request.status)}`}
          title="Consult this request"
        >
          <Link to={`/request/details?id=${request._id}`}>
            <h2>
              {request.event.name} ({request.event.type})
            </h2>
            <p>
              <span className="bold">Sent by:</span> {request.sender.firstName}{" "}
              {request.sender.lastName} - {request.sender.clubName}
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
              <TimeAgo date={new Date(request.createdAt).toLocaleString()} />
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RenderedRequestList;
