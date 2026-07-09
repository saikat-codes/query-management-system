const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// hashing password before saving
userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) {
    return next();
  }

  console.log('Mongoose pre-save: Hashing plain text password string...');
  this.password = await bcrypt.hash(this.password, 10);
});

// comparing password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  console.log('Mongoose methods: Comparing input hash against database payload...');
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
