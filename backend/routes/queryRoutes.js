const express = require('express')
const protect = require('../middleware/protect')
const { createQuery, getAllQueries, updateQuery, deleteQuery, getMyQueries } = require('../controllers/queryController')

const router = express.Router()

router.post('/', createQuery)
router.get('/', getAllQueries)
router.put('/:id', updateQuery)
router.delete('/:id', deleteQuery)
router.get('/my', protect, getMyQueries)

module.exports = router
