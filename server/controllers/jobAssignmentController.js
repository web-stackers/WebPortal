const jobAssignment = require("../models/jobAssignment");
const job = require("../models/job");
const transporter = require("../send-email/sendEmail");

// Fetch all job assignment
const fetch_jobAssignments = async (req, res) => {
  try {
    const jobAssignments = await jobAssignment.find();
    res.status(200).json(jobAssignments);
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

// Update when job is withdrawn
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
    const updatedJobWithdrawn = await jobAssignment.findByIdAndUpdate(
      id,
      {
        state: "Job pending",
        withdrawn: {
          arisedBy: requiredJobAssignment.withdrawn.arisedBy,
          reason: requiredJobAssignment.withdrawn.reason,
          adminResponse: req.body.adminResponse,
        },
      },
      { new: true }
    );
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
};
