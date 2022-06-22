const chat = require("../models/chat");

const post_messages = async (req, res) => {
  const newChat = new chat({
    jobAssignmentId: req.body.jobAssignmentId,
    message: req.body.message,
    arisedBy: req.body.arisedBy,
    timestamp: new Date(),
  });

  try {
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const fetch_messages = async (req, res) => {
  try {
    const allChat = await chat.find();
    res.status(201).json(allChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { post_messages, fetch_messages };
