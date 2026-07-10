const User = require('../models/User');
const Query = require('../models/Query');
const { sendEmail, sendTelegram } = require('../utils/notifications');

// Create query (Protected via middleware)
const createQuery = async (req, res) => {
  try {
    const { name, message } = req.body;
    console.log('Mongoose Pipeline: Creating query for logged-in user id:', req.user.userId);

    // find user from the auth token
    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log('Session Verification Error: Failed to find active session matching token id');
      return res.status(404).json({ message: 'User account session not found' });
    }

    // save query to database with user reference
    const query = await Query.create({
      name: name || user.name,
      email: user.email,
      message: message,
      userId: user._id
    });

    console.log('Mongoose Pipeline: Saved new query entry to mongo:', query._id);

    // Notification integrations
    console.log('Notification Service: Triggering third-party integration pipelines...');
    await sendEmail(user.email, name || user.name, message, 'pending');
    await sendTelegram(name || user.name, user.email, message, 'pending');

    return res.status(201).json(query);
  } catch (error) {
    console.log('Error inside createQuery controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

const getMyQueries = async (req, res) => {
  try {
    console.log('Data Pipeline: Pulling private queries history list for user:', req.user.userId);
    const queries = await Query.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    return res.status(200).json(queries);
  } catch (error) {
    console.log('Error inside getMyQueries controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllQueries = async (req, res) => {
  try {
    console.log('Admin Station: Pulling complete database records list...');
    const queries = await Query.find().sort({ createdAt: -1 });
    return res.status(200).json(queries);
  } catch (error) {
    console.log('Error inside getAllQueries controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

const updateQuery = async (req, res) => {
  try {
    console.log('Admin Station: Updating query reference target id:', req.params.id, 'to status:', req.body.status);
    const query = await Query.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });

    if (!query) {
      console.log('Update Operations Failure: Target record not found in system collection');
      return res.status(404).json({ message: 'Query not found' });
    }

    console.log('Notification Service: Dispatching status change notifications across channels...');
    await sendEmail(query.email, query.name, query.message, req.body.status);
    await sendTelegram(query.name, query.email, query.message, req.body.status);

    return res.status(200).json(query);
  } catch (error) {
    console.log('Error inside updateQuery controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteQuery = async (req, res) => {
  try {
    console.log('Admin Station: Attempting to drop database record id:', req.params.id);

    const query = await Query.findByIdAndDelete(req.params.id);

    if (!query) {
      console.log('Delete Operations Failure: Selected document target is missing');
      return res.status(404).json({ message: 'Query not found' });
    }

    if (query.userId) {
      const remainingQueriesCount = await Query.countDocuments({ userId: query.userId });
      console.log(`Cascade Integrity System: User ID ${query.userId} has ${remainingQueriesCount} queries remaining.`);

      if (remainingQueriesCount === 0) {
        console.log(`Database Cleanup: Purging orphaned profile account associated with User ID ${query.userId}...`);
        await User.findByIdAndDelete(query.userId);
      }
    }

    return res.status(200).json({ message: 'Query deleted and account cleaned up successfully.' });
  } catch (error) {
    console.log('Error inside deleteQuery conditional cascade block:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuery, getAllQueries, updateQuery, deleteQuery, getMyQueries };
