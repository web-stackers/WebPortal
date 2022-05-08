const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// jobTypeCategory
const JobTypeCategorySchema = Schema({
  jobType: {
    type: String,
    required: true,
    unique: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  poviderCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("JobTypeCategory", JobTypeCategorySchema);
