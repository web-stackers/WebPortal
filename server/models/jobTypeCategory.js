const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// jobTypeCategory
const JobTypeCategorySchema = Schema({
  jobType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("JobTypeCategory", JobTypeCategorySchema);
