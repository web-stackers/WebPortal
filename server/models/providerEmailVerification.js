const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating collection for secondary user
const ProviderEmailVerificationSchema = new Schema({
  providerId: {
    type: mongoose.Types.ObjectId,
    ref: "Provider",
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

module.exports = mongoose.model("ProviderEmailVerification", ProviderEmailVerificationSchema);
