const User = require('../models/User');
const Query = require("../models/Query");
const { sendEmail, sendTelegram } = require('../utils/notifications');

// create query (Protected via middleware)
const createQuery = async (req, res) => {
  try {
    const { name, message } = req.body;
    console.log('creating query for logged-in user id:', req.user.userId);

    // 1. Find user from the auth token
    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log('failed to find active session matching token id');
      return res.status(404).json({ message: 'User account session not found' });
    }

    // 2. Save query to database with user reference
    const query = await Query.create({
      name: name || user.name,
      email: user.email,
      message: message,
      userId: user._id
    });

    console.log('saved new query entry to mongo:', query._id);

    // notification integrations
    console.log('triggering notification integrations...');
    await sendEmail(user.email, name || user.name, message, 'pending');
    await sendTelegram(name || user.name, user.email, message, 'pending');

    return res.status(201).json(query);

  } catch (error) {
    console.log('error inside createQuery:', error);
    return res.status(500).json({ message: error.message });
  }
};

const getMyQueries = async (req, res) => {
  try {
    console.log('pulling private queries history list for user:', req.user.userId);
    const queries = await Query.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    return res.status(200).json(queries);
  } catch (error) {
    console.log('error inside getMyQueries:', error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllQueries = async (req, res) => {
  try {
    console.log('admin dashboard request: pulling all site records...');
    const queries = await Query.find().sort({ createdAt: -1 });
    return res.status(200).json(queries);
  } catch (error) {
    console.log('error inside getAllQueries:', error);
    return res.status(500).json({ message: error.message });
  }
};

const updateQuery = async (req, res) => {
  try {
    console.log('updating query reference target id:', req.params.id, 'status:', req.body.status);
    const query = await Query.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });

    if (!query) {
      console.log('update failed: target record not found');
      return res.status(404).json({ message: "Query not found" });
    }

    console.log('dispatching status update notifications...');
    await sendEmail(query.email, query.name, query.message, req.body.status);
    await sendTelegram(query.name, query.email, query.message, req.body.status);

    return res.status(200).json(query);
  } catch (error) {
    console.log('error inside updateQuery:', error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteQuery = async (req, res) => {
  try {
    console.log('attempting to drop database record id:', req.params.id);
    const query = await Query.findByIdAndDelete(req.params.id);

    if (!query) {
      console.log('delete target failed: item missing');
      return res.status(404).json({ message: "Query not found" });
    }

    return res.status(200).json({ message: "Query deleted" });
  } catch (error) {
    console.log('error inside deleteQuery:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuery, getAllQueries, updateQuery, deleteQuery, getMyQueries };
