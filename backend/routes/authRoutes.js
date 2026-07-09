const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, getMe } = require('../controllers/authController')
const protect = require('../middleware/protect')

// auth routing endpoints
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

// protected user profile information endpoint
router.get('/me', protect, getMe)

module.exports = router
