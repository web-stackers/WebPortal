const jobAssignment = require("../models/jobAssignment");
const job = require("../models/job");
const transporter = require("../send-email/sendEmail");
const provider = require("../models/provider");
const consumer = require("../models/consumer");

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
      { state: "Job Pending" },
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
    const requiredJobAssignment = await jobAssignment.findById(id);
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

// Update when any party applied for withdrawal of job
const withdrawl_pending = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredJobAssignment = await jobAssignment.findById(id);
    const updatedJobWithdrawn = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Withdrawl Pending",
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
const withdrawl_accepted = async (req, res) => {
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
      subject: "Rejection of withdrawal request",
      html:
        " Hi, <br> Sorry to inform you, your requested job has been withdrawn by " +
        requiredJobAssignment.withdrawn.arisedBy +
        ". Because " +
        requiredJobAssignment.withdrawn.reason +
        ". <br> Sorry for your inconvinience caused.",
    };
    const updatedJobWithdrawn = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Job withdrawed",
        withdrawn: {
          //If we didn't update the fields of object again, those will be deleted. So we fetch them from the database and update with the same.
          arisedBy: requiredJobAssignment.withdrawn.arisedBy,
          reason: requiredJobAssignment.withdrawn.reason,
          adminResponse: "Accepted",
        },
      },
      { upsert: true, new: true }
    );
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
const withdrawl_rejected = async (req, res) => {
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
    const updatedJobWithdrawn = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Job pending",
        withdrawn: {
          arisedBy: requiredJobAssignment.withdrawn.arisedBy,
          reason: requiredJobAssignment.withdrawn.reason,
          adminResponse: "Rejected",
        },
      },
      { new: true }
    );
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
    approximatedDuration: {
      days: req.body.days,
      minutes: parseInt(req.body.hours) * 60 + parseInt(req.body.minutes),
    },
    amount: req.body.amount,
  };

  try {
    const updatedJobAssignment = await jobAssignment.findByIdAndUpdate(
      id,
      { quotation: newQuotation },
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


module.exports = {
  post_jobAssignment,
  fetch_jobAssignments,
  fetch_jobAssignment,
  quotation_accepted,
  quotation_rejected,
  withdrawl_pending,
  withdrawl_accepted,
  withdrawl_rejected,
  insert_quotation,
  fetch_job_and_jobAssignments,
  fetch_completed_jobcount,
  fetch_pending_jobcount,
};
