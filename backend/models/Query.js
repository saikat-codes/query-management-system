const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'closed'],
    default: 'pending',
  },
}, { timestamps: true });

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
