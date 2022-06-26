const jobAssignment = require("../models/jobAssignment");
const job = require("../models/job");
const transporter = require("../send-email/sendEmail");
const provider = require("../models/provider");
const consumer = require("../models/consumer");
const jobController = require("../controllers/jobController");

// Fetch all job assignment
const fetch_jobAssignments = async (req, res) => {
  try {
    const jobAssignments = await jobAssignment.find();
    res.status(200).json(jobAssignments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const fetch_job_and_jobAssignments = async (req, res) => {
  try {
    const jobAndJobAssignments = await jobAssignment.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
    ]);
    res.status(200).json(jobAndJobAssignments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add new job assignment to the database
const post_jobAssignment = async (req, res) => {
  const newAssignment = new jobAssignment({
    state: "Request pending",
    providerId: req.body.providerId,
    jobId: req.body.jobId,
  });

  try {
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Fetch job Assignment by id
const fetch_jobAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredJobAssignment = await jobAssignment.findById(id);
    res.status(200).json(requiredJobAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update when quotation is accepted
const quotation_accepted = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredJobAssignment = await jobAssignment.findById(id);
    //update the derived attribute provider when quotation is accepted.
    const updatedJobProvider = await job.findByIdAndUpdate(
      requiredJobAssignment.jobId,
      { providerId: requiredJobAssignment.providerId }, //set the job collection provider id attribute with the id taken from job assignment provider ID
      { new: true }
    );
    const updatedJobPending = await jobAssignment.findByIdAndUpdate(
      id,
      { state: "Job pending" },
      { new: true }
    );
    res.status(200).json(updatedJobPending);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update state and reason when quotation is rejected
const quotation_rejected = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedQuotationRejected = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Quotation rejected",
        reason: req.body.reason,
      },
      { new: true }
    );
    res.status(200).json(updatedQuotationRejected);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update state and reason when job request is rejected by provider
const job_rejected = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedJobRejected = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Request rejected",
        reason: req.body.reason,
      },
      { new: true }
    );
    res.status(200).json(updatedJobRejected);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update state  when job request is cancelled by consumer
const job_cancelled = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedJobCancelled = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Request cancelled",
      },
      { new: true }
    );
    res.status(200).json(updatedJobCancelled);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update when any party applied for withdrawal of job
const withdrawal_pending = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedJobWithdrawn = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Withdrawal pending",
        withdrawn: {
          arisedBy: req.body.arisedBy,
          reason: req.body.reason,
          adminResponse: "Pending",
        },
      },
      { new: true }
    );
    res.status(200).json(updatedJobWithdrawn);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update when withdrawl request is accepted by admin
const withdrawal_accepted = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredJobAssignment = await jobAssignment.findById(id);
    const requiredJob = await job.findById(requiredJobAssignment.jobId);
    const requiredConsumer = await consumer.findById(requiredJob.consumerId);
    const requiredProvider = await provider.findById(requiredJob.providerId);
    if (requiredJobAssignment.withdrawn.arisedBy === "consumer") {
      var ToMail = requiredProvider.contact.email;
    } else {
      var ToMail = requiredConsumer.contact.email;
    }
    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: ToMail,
      subject: "Withdrawal of job",
      html:
        " Hi, <br> Sorry to inform you, your requested job has been withdrawn by " +
        requiredJobAssignment.withdrawn.arisedBy +
        ". Because " +
        requiredJobAssignment.withdrawn.reason +
        ". <br> Sorry for your inconvinience caused.",
    };
    const updatedJobWithdrawn = await jobAssignment.findByIdAndUpdate(id, {
      state: "Job withdrawn",
      withdrawn: {
        //If we didn't update the fields of object again, those will be deleted. So we fetch them from the database and update with the same.
        arisedBy: requiredJobAssignment.withdrawn.arisedBy,
        reason: requiredJobAssignment.withdrawn.reason,
        adminResponse: "Accepted",
      },
    });
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json(updatedJobWithdrawn);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update when withdrawl request is rejected by admin
const withdrawal_rejected = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredJobAssignment = await jobAssignment.findById(id);
    const requiredJob = await job.findById(requiredJobAssignment.jobId);
    const requiredConsumer = await consumer.findById(requiredJob.consumerId);
    const requiredProvider = await provider.findById(requiredJob.providerId);
    if (requiredJobAssignment.withdrawn.arisedBy === "consumer") {
      var ToMail = requiredConsumer.contact.email;
    } else {
      var ToMail = requiredProvider.contact.email;
    }
    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: ToMail,
      subject: "Rejection of withdrawal request",
      html: " Hi, <br> Sorry, your withdrawal request has been rejected by helper community. <br> So you are requested to finished that accepted work as per your agreement. <br> Thank You",
    };
    const updatedJobWithdrawn = await jobAssignment.findByIdAndUpdate(id, {
      state: "Job pending",
      withdrawn: {
        arisedBy: requiredJobAssignment.withdrawn.arisedBy,
        reason: requiredJobAssignment.withdrawn.reason,
        adminResponse: "Rejected",
      },
    });
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json(updatedJobWithdrawn);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Insert provider's quotation
const insert_quotation = async (req, res) => {
  const { id } = req.params;
  const newQuotation = {
    estimatedTime: req.body.estimatedTime,
    amount: req.body.amount,
  };

  try {
    const updatedJobAssignment = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Quotation sent",
        quotation: newQuotation,
      },
      { new: true }
    );
    res.status(200).json(updatedJobAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

// Fetch completed job count
const fetch_completed_jobcount = async (req, res) => {
  try {
    const completedJobCount = await jobAssignment.count({
      state: { $regex: /Completed/i },
    });
    res.status(200).json(completedJobCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch pending job count
const fetch_pending_jobcount = async (req, res) => {
  try {
    const pendingJobCount = await jobAssignment.count({
      state: { $regex: /Job Pending/i },
    });
    res.status(200).json(pendingJobCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Updated expired job state as completed
const complete_state = async (id) => {
  try {
    const updatedJobAssignment = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Job completed",
      },
      { new: true }
    );
    return JSON.stringify(updatedJobAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Find pending jobs and update completed jobs
const complete_jobAssignments = async (req, res) => {
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
      $match: { "userJobs.state": { $eq: "Job pending" } },
    },
    {
      $project: {
        requestedTime: 1,
        providerId: 1,
        consumerId: 1,
        "userJobs._id": 1,
        "userJobs.state": 1,
        "userJobs.quotation.estimatedTime": 1,
      },
    },
  ];

  try {
    const jobs = await job.aggregate(query);
    let pendingJobs = [];

    if (type == "consumer") {
      pendingJobs = jobs.filter((job) => {
        if (job.consumerId == id) {
          return job;
        }
      });
    } else if (type == "provider") {
      pendingJobs = jobs.filter((job) => {
        if (job.providerId == id) {
          return job;
        }
      });
    }

    let completedJobs = pendingJobs.map((job) => {
      if (job.userJobs[0].quotation.estimatedTime < Date.now()) {
        return complete_state(job.userJobs[0]._id);
      }
    });
    res.json(completedJobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  post_jobAssignment,
  fetch_jobAssignments,
  fetch_jobAssignment,
  quotation_accepted,
  quotation_rejected,
  job_rejected,
  withdrawal_pending,
  withdrawal_accepted,
  withdrawal_rejected,
  insert_quotation,
  fetch_job_and_jobAssignments,
  fetch_completed_jobcount,
  fetch_pending_jobcount,
  complete_jobAssignments,
  job_cancelled,
};
