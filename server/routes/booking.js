const express = require('express');
const bookingController = require('../controllers/bookingController.js');

const router = express.Router();

router.post('/step1', bookingController.step1);
router.post('/step2', bookingController.step2);
router.post('/step3', bookingController.step3);

module.exports = router;
