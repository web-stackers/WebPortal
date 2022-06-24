const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating collection for secondary user
const ConsumerEmailVerificationSchema = new Schema({
  consumerId: {
    type: mongoose.Types.ObjectId,
    ref: "Consumer",
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    // default: Date.now,
  },
  expiresAt: {
    type: Date,
    // default: Date.now,
  },
});

module.exports = mongoose.model("ConsumerEmailVerification", ConsumerEmailVerificationSchema);
