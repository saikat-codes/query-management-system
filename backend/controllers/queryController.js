const Query = require("../models/Query");
const { sendEmail, sendTelegram } = require('../utils/notifications')

//create query
const createQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const query = await Query.create({ name, email, message });

//send create text
    await sendEmail(email, name, message, 'pending')
    await sendTelegram(name, email, message, 'pending')

    res.status(201).json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get query
const getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update query
const updateQuery = async (req, res) => {
  try {
    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

// send update text
    await sendEmail(query.email, query.name, query.message, req.body.status)
    await sendTelegram(query.name, query.email, query.message, req.body.status)

    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete query
const deleteQuery = async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ message: "Query deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuery, getAllQueries, updateQuery, deleteQuery}
