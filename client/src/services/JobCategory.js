import axios from "axios";

const fetchJobCategory = async () => {
  return await axios.get("/jobTypeCategory");
};

const fetchJob = async (id) => {
  return await axios.get(`/jobTypeCategory/${id}`);
};

const updateJobByID = async (id, data) => {
  return await axios.patch(`/jobTypeCategory/update/${id}`, data);
};

const addNew = async (data) => {
  return await axios.post("/jobTypeCategory", data);
};

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
