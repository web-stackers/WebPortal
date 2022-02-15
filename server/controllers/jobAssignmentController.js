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

// Update provider's quotation
const update_quotation = async (req, res) => {
  const { id } = req.params;
  const timeInMinutes = req.body.hours*60 + req.body.minutes; 

  try{
    const updatedJobAssignment = await jobAssignment.findByIdAndUpdate(id, {
      quotation: {
        approximateDuration: {
          days: req.body.days,
          minutes: timeInMinutes,
        },
        amount: req.body.amount
      }   
    }, 
    {new:true});
    res.status(200).json(updatedJobAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
}

module.exports = {
  post_jobAssignment,
  fetch_jobAssignments,
  fetch_jobAssignment,
  update_quotation
};
