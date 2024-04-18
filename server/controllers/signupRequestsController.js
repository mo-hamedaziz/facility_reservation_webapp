const SignupRequest = require("../models/signupRequestsModel");

const getAllSignupRequests = async (req, res) => {
  try {
    const request_list = await SignupRequest.find({}).sort({ createdAt: -1 });
    res.status(200).json(request_list);
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

const getSingleSignupRequest = async (req, res) => {
  try {
    const request = await SignupRequest.findById(req.query.id);
    if (!request) {
      return res.status(404).json({ error: "Signup request not found!" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

const deleteSingleSignupRequest = async (req, res) => {
  try {
    const deletedRequest = await SignupRequest.findOneAndDelete(req.query.id);
    if (!deletedRequest) {
      return res.status(404).json({ error: "Signup request not found!" });
    }
    res.status(200).json(deletedRequest);
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

module.exports = {
  getAllSignupRequests,
  getSingleSignupRequest,
  deleteSingleSignupRequest
};
