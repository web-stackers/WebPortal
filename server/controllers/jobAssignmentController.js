const jobAssignment = require("../models/jobAssignment");

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

// Update state when quotation is accepted
const quotation_accepted = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredJobAssignment = await jobAssignment.findById(id);
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
          adminResponse: "Accepted",
        },
      },
      { new: true }
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
// Update provider's quotation
const update_quotation = async (req, res) => {
  const { id } = req.params;
  const timeInMinutes = req.body.hours * 60 + req.body.minutes;

  try {
    const updatedJobAssignment = await jobAssignment.findByIdAndUpdate(
      id,
      {
        quotation: {
          approximateDuration: {
            days: req.body.days,
            minutes: timeInMinutes,
          },
          amount: req.body.amount,
        },
      },
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
  update_quotation,
};