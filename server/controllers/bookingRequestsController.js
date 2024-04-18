const BookingRequest = require("../models/bookingRequestModel");
const Classroom = require("../models/classroomsModel");

// Get all booking requests
const getAllBookingRequests = async (req, res) => {
  try {
    let filter = {};

    if (req.query.id) {
      filter.sender = req.query.id; // Assuming id is for filtering by ID
    }

    if (
      req.query.show === "pending" ||
      req.query.show === "denied" ||
      req.query.show === "approved"
    ) {
      filter.status =
        req.query.show.charAt(0).toUpperCase() + req.query.show.slice(1);
    }

    const requests = await BookingRequest.find(filter)
      .populate(["event", "sender", "requested_classroom"])
      .sort({ createdAt: -1 });
    const locations = await Classroom.find({}).sort({ name: 1 });

    res.status(200).json({ requests, locations });
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get single booking request
const getSingleRequest = async (req, res) => {
  try {
    const request = await BookingRequest.findById(req.query.id).populate([
      "event",
      "sender",
      "requested_classroom",
    ]);
    if (!request) {
      res
        .status(404)
        .json({ error: "This request was NOT FOUND on the server!" });
    } else {
      res.status(200).json(request);
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

// Change booking request status
const changeRequestStatus = async (req, res) => {
  try {
    const request = await BookingRequest.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    ).populate(["event", "sender", "requested_classroom"]);
    if (!request) {
      res
        .status(404)
        .json({ error: "This request was NOT FOUND on the server!" });
    } else {
      res.status(200).json(request);
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

// Handle server errors
const handleServerError = (res, error) => {
  console.error("Internal Server Error:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = {
  getAllBookingRequests,
  getSingleRequest,
  changeRequestStatus,
};
