const express = require('express');

const {
    getAllPresidents,
} = require ('../controllers/presidentsController');

const router = express.Router();

// GET all presidents list
router.get('/list', getAllPresidents);

module.exports = {presidentsRoutes:router};