const job = require("../models/job");
const JobAssignment = require("../models/jobAssignment");
const provider = require("../models/provider");
const consumer = require("../models/consumer");
const chats = require("../models/chat");

const transporter = require("../send-email/sendEmail");

// Fetch all jobs
const fetch_jobs = async (req, res) => {
  try {
    const jobs = await job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all complaints by consumer
const fetch_all_complaints_by_consumer = async (req, res) => {
  try {
    const item = await job.find(
      { "complaint.by": "consumer" },
      { _id: 0, complaint: { $elemMatch: { by: "consumer" } } }
    );

    //const category = await item;
    //const ok =await category.complaint[0].by;
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch job by consumer complaints
const fetch_all_job_by_consumer_complaints = async (req, res) => {
  const { id } = req.params;
  try {
    const requiredjob = await job.find({
      complaint: { $elemMatch: { _id: id } },
    });
    const requiredConsumer = await consumer.findById(requiredjob[0].consumerId);
    //const category = await item;
    const ok = await requiredConsumer.name.fName;
    res.status(200).json(requiredConsumer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all complaints by provider
const fetch_all_complaints_by_provider = async (req, res) => {
  try {
    const complaint = await job.find(
      { "complaint.by": "provider" },
      { _id: 0, complaint: { $elemMatch: { by: "provider" } } }
    );

    res.status(200).json(complaint);
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
    providerId: req.body.providerId,
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

//update profile picture for secondary user
const upload_photo = async (req, res) => {
  console.log("function call check");
  const { id } = req.params;
  let profilePictureBuffer;
  try {
    profilePictureBuffer = fs.readFileSync(req.body.profilePath.filePath);
    console.log(profilePictureBuffer);
    const updateJob = await secondaryUser.findByIdAndUpdate(
      id,
      {
        jobPhoto: {
          data: profilePictureBuffer,
          contentType: req.body.profilePath.type,
        },
      },
      { new: true }
    );
    res.status(200).json(updateJob);
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
            othercategory: req.body.othercategory,
            description: req.body.description,
            date: new Date(),
            adminResponse: "Pending",
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
    const updatedJob = await job.update(
      { "complaint._id": id },
      {
        $set: {
          "complaint.$.adminResponse": req.body.adminResponse,
        },
      },
      { new: true }
    );

    const requiredjob = await job.find({
      complaint: { $elemMatch: { _id: id } },
    });
    const requiredConsumer = await consumer.findById(requiredjob[0].consumerId);
    const requiredProvider = await provider.findById(requiredjob[0].providerId);

    if (requiredjob[0].complaint.by === "Provider") {
      var ToMail = requiredProvider.contact.email;
    } else {
      var ToMail = requiredConsumer.contact.email;
    }

    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: ToMail,
      subject: "Response to your complaint",
      html:
        " Hi, <br>" +
        req.body.adminResponse +
        ". <br> Sorry for your inconveniences caused.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

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

    if (req.body.rating) {
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

// Fetch job history of a user
const user_jobs = async (req, res) => {
  const { type, id } = req.params;

  var query = [
    {
      $lookup: {
        from: "jobassignments",
        let: { jid: "$_id", pid: "$providerId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$$jid", "$jobId"] },
                  { $eq: ["$$pid", "$providerId"] },
                ],
              },
            },
          },
        ],
        as: "userJobs",
      },
    },
    {
      $lookup: {
        from: "providers",
        localField: "providerId",
        foreignField: "_id",
        as: "provider",
      },
    },
    {
      $lookup: {
        from: "consumers",
        localField: "consumerId",
        foreignField: "_id",
        as: "consumer",
      },
    },
    {
      $project: {
        jobType: 1,
        description: 1,
        requestedTime: 1,
        providerId: 1,
        consumerId: 1,
        "userJobs._id": 1,
        "userJobs.state": 1,
        "provider.name.fName": 1,
        "consumer.name.fName": 1,
      },
    },
  ];

  try {
    const jobs = await job.aggregate(query);

    if (type == "consumer") {
      const userJobs = jobs.filter((job) => {
        if (job.consumerId == id) {
          return job;
        }
      });
      res.json(userJobs);
    } else if (type == "provider") {
      const userJobs = jobs.filter((job) => {
        if (job.providerId == id) {
          return job;
        }
      });
      res.json(userJobs);
    } else if (type == "both") {
      res.json(jobs);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch job history of a user for state transition
const user_job_assignments = async (req, res) => {
  const { type, id } = req.params;

  var query = [
    {
      $lookup: {
        from: "jobassignments",
        localField: "_id",
        foreignField: "jobId",
        as: "jobassignment",
      },
    },
    {
      $lookup: {
        from: "providers",
        localField: "providerId",
        foreignField: "_id",
        as: "provider",
      },
    },
    {
      $lookup: {
        from: "consumers",
        localField: "consumerId",
        foreignField: "_id",
        as: "consumer",
      },
    },
    {
      $project: {
        jobType: 1,
        initializedDate: 1,
        jobAssignmentId: 1,
        description: 1,
        requestedTime: 1,
        providerId: 1,
        consumerId: 1,
        "ratingAndReview.by": 1,
        "complaint.by": 1,
        "complaint._id": 1,
        "jobassignment._id": 1,
        "jobassignment.state": 1,
        "jobassignment.reason": 1,
        "jobassignment.quotation.amount": 1,
        "jobassignment.quotation.estimatedTime": 1,
        "jobassignment.withdrawn.reason": 1,
        "jobassignment.withdrawn.arisedBy": 1,
        "jobassignment.withdrawn.adminResponse": 1,
        "provider.name.fName": 1,
        "provider.name.lName": 1,
        "consumer.name.fName": 1,
        "consumer.name.lName": 1,
        "provider.totalRating": 1,
        "provider.ratingCount": 1,
        "consumer.totalRating": 1,
        "consumer.ratingCount": 1,
      },
    },
  ];

  try {
    const jobs = await job.aggregate(query);

    if (type == "consumer") {
      const userJobs = jobs.filter((job) => {
        if (job.consumerId == id) {
          return job;
        }
      });
      res.json(userJobs);
    } else if (type == "provider") {
      const userJobs = jobs.filter((job) => {
        if (job.providerId == id) {
          return job;
        }
      });
      res.json(userJobs);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch job withdrawals of a user
const user_withdrawals = async (req, res) => {
  var query = [
    {
      $lookup: {
        from: "jobassignments",
        let: { jid: "$_id", pid: "$providerId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$$jid", "$jobId"] },
                  { $eq: ["$$pid", "$providerId"] },
                ],
              },
            },
          },
        ],
        as: "userJobs",
      },
    },
    {
      $lookup: {
        from: "providers",
        localField: "providerId",
        foreignField: "_id",
        as: "provider",
      },
    },
    {
      $lookup: {
        from: "consumers",
        localField: "consumerId",
        foreignField: "_id",
        as: "consumer",
      },
    },
    {
      $project: {
        jobType: 1,
        providerId: 1,
        consumerId: 1,
        "userJobs.withdrawn": 1,
        "userJobs._id": 1,
        "userJobs.state": 1,
        "provider.name.fName": 1,
        "consumer.name.fName": 1,
      },
    },
  ];

  try {
    const user_withdrawals = await job.aggregate(query);
    res.json(user_withdrawals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch Quotation for mobile app
const fetch_Quotation = async (req, res) => {
  const { id } = req.params;

  var query = [
    {
      $lookup: {
        from: "jobassignments",
        let: { jid: "$_id", pid: "$providerId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$$jid", "$jobId"] },
                  { $eq: ["$$pid", "$providerId"] },
                ],
              },
            },
          },
        ],
        as: "userJobs",
      },
    },
    {
      $lookup: {
        from: "providers",
        localField: "providerId",
        foreignField: "_id",
        as: "provider",
      },
    },
    {
      $lookup: {
        from: "consumers",
        localField: "consumerId",
        foreignField: "_id",
        as: "consumer",
      },
    },
    {
      $project: {
        jobType: 1,
        description: 1,
        requestedTime: 1,
        providerId: 1,
        consumerId: 1,
        "userJobs.quotation": 1,
        "userJobs.state": 1,
        "provider.name.fName": 1,
        "consumer.name.fName": 1,
      },
    },
  ];

  try {
    const jobs = await job.aggregate(query);

    const userJobs = jobs.filter((job) => {
      if (job._id == id) {
        return job;
      }
    });
    res.json(userJobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get count of total complaints
const fetch_complaint_count = async (req, res) => {
  try {
    const cComplaintCount = await job.count({ "complaint.by": "Consumer" });
    const pComplaintCount = await job.count({ "complaint.by": "Provider" });
    const complaintCount = cComplaintCount + pComplaintCount;
    res.status(200).json(complaintCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const check_provider_availability = async (req, res) => {
  const { id, time } = req.params;
  let isProviderExist = false;
  try {
    const requiredJob = await job.findOne({
      providerId: id,
      state: "Job pending",
      requestedTime: { $gte: time },
      estimatedTime: { $lte: time },
    });
    if (requiredJob) {
      isProviderExist = true;
    }
    res.status(200).json(isProviderExist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  fetch_jobs,
  fetch_all_complaints_by_consumer,
  fetch_all_job_by_consumer_complaints,
  fetch_all_complaints_by_provider,
  fetch_complaints,
  post_job,
  fetch_job,
  update_complaint,
  complaint_handled,
  update_ratingAndReview,
  user_jobs,
  user_job_assignments,
  fetch_complaint_count,
  user_withdrawals,
  fetch_Quotation,
  upload_photo,
  check_provider_availability,
};
