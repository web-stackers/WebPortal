const job = require("../models/job");
const provider = require("../models/provider");
const consumer = require("../models/consumer");

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

// Update complaint
const update_complaint = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComplain = await job.findByIdAndUpdate(
      id,
      {
        $push: {
          complaint: {
            by: req.body.by,
            category: req.body.category,
            description: req.body.description,
            date: new Date(),
            adminResponse: "pending",
          },
        },
      },
      { upsert: true, new: true }
    );
    res.status(200).json(updatedComplain);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

// Update when complaint handled by admin
const complaint_handled = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredJob = await job.findById(id);
    const updatedJob = await job.updateOne(
      { "complaint.by": "consumer" },
      {
        $set: {
          "complaint.$.adminResponse": req.body.adminResponse,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Update rating and review
const update_ratingAndReview = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRatingAndReview = await job.findByIdAndUpdate(
      id,
      {
        $push: {
          ratingAndReview: {
            by: req.body.by,
            rating: req.body.rating,
            review: req.body.review,
          },
        },
      },
      { upsert: true, new: true }
    );
    res.status(200).json(updatedRatingAndReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

module.exports = {
  fetch_jobs,
  post_job,
  fetch_job,
  update_complaint,
  complaint_handled,
  update_ratingAndReview,
};
