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
});

module.exports = mongoose.model("JobTypeCategory", JobTypeCategorySchema);
