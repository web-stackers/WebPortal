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

// Fetch all complaints
const fetch_all_complaints = async (req, res) => {
  try {
    const complain = await job.find();

    res.status(200).json(complain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch complaint by id
const fetch_complaints = async (req, res) => {
  const { id } = req.params;
  try {
    const requirejob = await job.findById(id);
    const complaints = await requirejob.complaint;

    res.status(200).json(complaints);
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
    //const requiredJob = await job.findById(id);
    const updatedJob = await job.updateOne(
      { _id: id, "complaint.by": "consumer" },
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
    const requiredJob = await job.findById(id);
    const requiredConsumer = await consumer.findById(requiredJob.consumerId);
    const requiredProvider = await provider.findById(requiredJob.providerId);

    if (req.body.by === "provider") {
      const updatedConsumerRating = await consumer.findByIdAndUpdate(
        requiredJob.consumerId,
        {
          ratingCount: requiredConsumer.ratingCount + 1,
          totalRating: requiredConsumer.totalRating + req.body.rating,
        }
      );
    } else {
      const updatedProviderRating = await provider.findByIdAndUpdate(
        requiredJob.providerId,
        {
          ratingCount: requiredProvider.ratingCount + 1,
          totalRating: requiredProvider.totalRating + req.body.rating,
        }
      );
    }
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
  fetch_all_complaints,
  fetch_complaints,
  post_job,
  fetch_job,
  update_complaint,
  complaint_handled,
  update_ratingAndReview,
};
