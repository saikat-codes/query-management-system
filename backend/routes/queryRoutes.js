const express = require('express');
const protect = require('../middleware/protect');
const { createQuery, getAllQueries, updateQuery, deleteQuery, getMyQueries } = require('../controllers/queryController');

const router = express.Router();

// user Facing Routes (Protected via session token)
router.post('/', protect, createQuery);
router.get('/my', protect, getMyQueries);

// admin Station Endpoints
router.get('/', getAllQueries);
router.put('/:id', updateQuery);
router.delete('/:id', deleteQuery);

module.exports = router;
