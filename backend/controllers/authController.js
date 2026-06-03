const User =  require('../models/User')
const jwt =  require('jsonwebtoken')

//make token and set cookie
const sendTokenCookie = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
}

const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body

    const existingUser = await User.findOne({email})
    if(existingUser) {
      return res.status(400).json({message: 'Email already registered'})
    }
    const user = await User.create({name, email, password})
    sendTokenCookie(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "No account found with this email" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    sendTokenCookie(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(0)
  })
  res.status(200).json({ message: 'Logged out' })
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


module.exports = { registerUser, loginUser, logoutUser, getMe }
