const express = require('express');

const {
    getAllPresidents,
    getSinglePresident,
    deleteSinglePresident,
    addPresident,
} = require ('../controllers/presidentsController');

const router = express.Router();

// GET all presidents list
router.get('/list', getAllPresidents);
router.get('/details', getSinglePresident);
router.delete('/details', deleteSinglePresident);
router.post('/add', addPresident);

module.exports = {presidentsRoutes:router};