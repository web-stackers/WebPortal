const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating collection for job
const JobSchema = new Schema({
  jobType: { type: String, required: true },
  initializedDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  address: {
    longitude: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    latitude: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  requestedTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  consumerId: {
    type: mongoose.Types.ObjectId,
    ref: "Consumer",
  },
  jobPhoto: [{ type: Buffer, contentType: String }],
  ratingAndReview: {
    rating: {
      consumer: { type: Number },
      provider: { type: Number },
    },
    reviews: {
      consumer: { type: String },
      provider: { type: String },
    },
  },
  complaint: [
    {
      by: { type: String },
      category: { type: String },
      date: { type: Date },
      description: { type: String },
      adminResponse: { type: String },
    },
  ],
});

module.exports = mongoose.model("Job", JobSchema);
