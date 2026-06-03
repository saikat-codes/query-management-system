const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  try {
    const token = req.cookies.token
    console.log('protect middleware - token:', token)
    console.log('protect middleware - JWT_SECRET:', process.env.JWT_SECRET)

    if (!token) {
      return res.status(401).json({ message: 'Not logged in' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()

  } catch (error) {
    console.log('protect error:', error.message)
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = protect
