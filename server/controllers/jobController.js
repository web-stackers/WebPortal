const job = require("../models/job");

// Fetch all jobs
const fetch_jobs = async (req, res) => {
  try {
    const jobs = await job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add new job to the database
const post_job = async (req, res) => {
  const newJob = new job({
    jobType: req.body.jobType,
    address: {
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
    requestedTime: req.body.requestedTime,
    description: req.body.description,
    jobPhoto: req.body.jobPhoto,
    consumerId: req.body.consumerId,
  });
  try {
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch job by id
const fetch_job = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredJob = await job.findById(id);
    res.status(200).json(requiredJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { fetch_jobs, post_job, fetch_job };
