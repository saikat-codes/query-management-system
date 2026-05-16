const express = require('express')
const { createQuery, getAllQueries, updateQuery, deleteQuery } = require('../controllers/queryController')

const router = express.Router();

router.post('/', createQuery);
router.get('/',getAllQueries);
router.put('/:id', updateQuery);
router.delete('/:id', deleteQuery);

module.exports = router;
