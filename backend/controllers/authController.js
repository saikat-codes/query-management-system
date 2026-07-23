const User = require('../models/User')
const jwt = require('jsonwebtoken')

// make token and set cookie
const sendTokenCookie = (res, userId) => {
  console.log('Generating JWT token for user id:', userId)


  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    console.log('Registration request received for email:', email)

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      console.log('Registration failed: Email already exists')
      return res.status(400).json({ message: 'Email already registered' })
    }

    const user = await User.create({ name, email, password })
    sendTokenCookie(res, user._id)

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } catch (err) {
    console.log('Error inside registerUser block:', err)
    return res.status(500).json({ message: err.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('Login attempt processing for email:', email)

    const user = await User.findOne({ email: email })
    if (!user) {
      console.log('Login failed: User not found')
      return res.status(401).json({ message: "No account found with this email" })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      console.log('Login failed: Password mismatch')
      return res.status(401).json({ message: "Incorrect password" })
    }

    sendTokenCookie(res, user._id)

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    console.log('Error inside loginUser block:', error)
    return res.status(500).json({ message: error.message })
  }
}


const logoutUser = async (req, res) => {
  try {

    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/' 
    });

    console.log('Auth Pipeline: Session cookie successfully invalidated.');

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });

  } catch (error) {
    console.log('Error inside logoutUser controller:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while logging out.'
    });
  }
};

const getMe = async (req, res) => {
  try {
    console.log('Looking up profile data matching decoded active user tracking id:', req.user.userId)
    const user = await User.findById(req.user.userId).select('-password')
    return res.status(200).json(user)
  } catch (error) {
    console.log('Error inside getMe checking layer:', error)
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { registerUser, loginUser, logoutUser, getMe }
