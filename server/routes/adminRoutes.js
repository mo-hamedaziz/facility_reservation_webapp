const express = require('express');

const {
    getAllAdmins,
    getSingleAdmin,
    deleteSingleAdmin,
    addAdmin,
    getAdminsCount, // import the new controller
} = require ('../controllers/adminController');

const router = express.Router();

// GET all admins list
router.get('/list', getAllAdmins);
router.get('/details', getSingleAdmin);
router.delete('/details', deleteSingleAdmin);
router.post('/add', addAdmin);
router.get('/count', getAdminsCount); // add new route for getting admins count

module.exports = {adminRoutes:router};