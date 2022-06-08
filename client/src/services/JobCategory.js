import axios from "axios";

//Fetch all job categories from job category collection
const fetchJobCategory = async () => {
  return await axios.get("/jobTypeCategory");
};

const fetchJob = async (id) => {
  return await axios.get(`/jobTypeCategory/${id}`);
};

//Update job type category collection by id
const updateJobByID = async (id, data) => {
  return await axios.patch(`/jobTypeCategory/update/${id}`, data);
};

//Adding new job type category
const addNew = async (data) => {
  return await axios.post("/jobTypeCategory", data);
};

//delete one job type category
const deleteOne = async (id) => {
  return await axios.delete(`/jobTypeCategory/${id}`);
};

// Fetch job category count
const fetchJobCategoryCount = async () => {
  return await axios.get("/jobTypeCategory/category/count");
};

// Fetch job type count
const fetchJobTypeCount = async () => {
  return await axios.get("/jobTypeCategory/type/count");
};

// Find jobType is unique or not
const jobTypeUniqueCheck = async (jobType) => {
  return await axios.get(`/jobTypeCategory/search/${jobType}`);
};

export default {
  fetchJobCategory,
  fetchJob,
  addNew,
  deleteOne,
  updateJobByID,
  fetchJobCategoryCount,
  fetchJobTypeCount,
  jobTypeUniqueCheck,
};
