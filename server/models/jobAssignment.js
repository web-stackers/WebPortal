const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating collection for job assignment
const JobAssignmentSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  reason: String,
  quotation: {
    approximatedDuration: {
      days: {
        type: Number,
        min: 0,
      },
      minutes: {
        type: Number,
        min: 0,
      },
    },
    amount: {
      type: Number,
      min: 0,
    },
  },
  withdrawn: {
    arisedBy: String,
    reason: String,
    adminResponse: String,
  },
  providerId: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
});

module.exports = mongoose.model("JobAssignment", JobAssignmentSchema);
