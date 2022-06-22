const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = Schema({
  jobAssignmentId: {
    type: mongoose.Types.ObjectId,
    ref: "JobAssignment",
  },
  message: { type: String },
  arisedBy: { type: String },
  timestamp: { type: String },
});

module.exports = mongoose.model("Chat", ChatSchema);
