const {
    getAllSignupRequests,
    getSingleSignupRequest,
    deleteSingleSignupRequest,
} = require('../controllers/signupRequestsController')

const express = require('express');

const router = express.Router();

// Get full list of signup requests
router.get('/list', getAllSignupRequests);

// Get details of a single signup request
router.get('/details', getSingleSignupRequest);

// Delete single signup request
router.delete('/delete', deleteSingleSignupRequest)

module.exports = {signupRequestsRoutes:router};