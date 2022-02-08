const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating collection for job
const JobSchema = new Schema({
  jobType: { type: String, required: true },
  initializedDate: { type: Date, required: true },
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
  requestedTime: { type: Date, required: true },
  description: { type: String, required: true },
  consumerId: {
    type: mongoose.Types.ObjectId,
    ref: "Consumer",
  },
  jobPhoto: [{ data: Buffer, contentType: String }],
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
  complaint: {
    consumer: {
      category: { type: String, required: true },
      date: { type: Date, required: true },
      description: { type: String },
      adminResponse: { type: String, required: true },
    },
    provider: {
      category: { type: String, required: true },
      date: { type: Date, required: true },
      description: { type: String },
      adminResponse: { type: String, required: true },
    },
  },
});

module.exports = mongoose.model("Job", JobSchema);
