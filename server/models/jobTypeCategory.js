const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// jobTypeCategory
const JobTypeCategorySchema = Schema({
  jobType: {
    type: String,
    required: true,
    unique: true,
  },
  //just for checking purpose I gave the default value for category. LaterOn should be removed.
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("JobTypeCategory", JobTypeCategorySchema);
