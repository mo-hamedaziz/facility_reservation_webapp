const express = require('express');

const {
    getAllPresidents,
    getSinglePresident,
    deleteSinglePresident,
    addPresident,
    getPresidentsCount, // import the new controller
} = require ('../controllers/presidentsController');

const router = express.Router();

// GET all presidents list
router.get('/list', getAllPresidents);
router.get('/details', getSinglePresident);
router.delete('/details', deleteSinglePresident);
router.post('/add', addPresident);
router.get('/count', getPresidentsCount); // add new route for getting presidents count

module.exports = {presidentsRoutes:router};