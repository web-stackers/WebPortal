const job = require("../models/job");
const provider = require("../models/provider");

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

// Update Complaint of providers
const update_complaint_provider = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComplaintProvider = await job.findByIdAndUpdate(
      id,
      {
        complaint: {
          provider: {
            category: req.body.category,
            description: req.body.description,
            date: new Date(),
          },
        },
      },
      { new: true }
      //{ upsert: true }
    );
    res.status(200).json(updatedComplaintProvider);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

// Update Complaint of consumer
const update_complaint_consumer = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComplaintConsumer = await job.findByIdAndUpdate(
      id,
      {
        complaint: {
          consumer: {
            category: req.body.category,
            description: req.body.description,
            date: new Date(),
          },
        },
        //{ upsert: true }
      },
      { new: true }
    );
    res.status(200).json(updatedComplaintConsumer);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

module.exports = {
  fetch_jobs,
  post_job,
  fetch_job,
  update_complaint_provider,
  update_complaint_consumer,
};
