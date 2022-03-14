const consumer = require("../models/consumer");

// Fetch all consumers
const fetch_consumers = async (req, res) => {
  try {
    const consumers = await consumer.find();
    res.status(200).json(consumers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add new consumer to the database
const post_consumer = async (req, res) => {
  const newConsumer = new consumer({
    name: {
      fName: req.body.fName,
      lName: req.body.lName,
    },
    contact: {
      mobile: req.body.mobile,
      email: req.body.email,
    },
    address: {
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
    profilePicture: req.body.profilePicture,
    password: req.body.password,
  });

  try {
    await newConsumer.save();
    res.status(201).json(newConsumer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch consumer by id
const fetch_consumer = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredConsumer = await consumer.findById(id);
    res.status(200).json(requiredConsumer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch consumer by search key
const search_consumer = async (req, res) => {
  const { key } = req.params;
  const searchKey = new RegExp(key, "i");

  try {
    const searchResult = await consumer.find({
      $or: [{ "name.fName": searchKey }, { "name.lName": searchKey }],
    });
    res.status(200).json(searchResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Disable or Enable consumer
const disable_consumer = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredConsumer = await consumer.findById(id);
    const ableUpdatedConsumer = await consumer.findByIdAndUpdate(
      id,
      { isDisabled: !requiredConsumer.isDisabled },
      { new: true }
    );
    res.status(200).json(ableUpdatedConsumer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get count of total consumers
const fetch_consumer_count = async (req, res) => {
  try {
    const consumerCount = await consumer.count();
    res.status(200).json(consumerCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  fetch_consumers,
  post_consumer,
  fetch_consumer,
  disable_consumer,
  search_consumer,
  fetch_consumer_count,
};
