import axios from "axios";

const fetchJobCategory = async () => {
  return await axios.get("/jobTypeCategory");
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

export default {
  fetchJobCategory,
  addNew,
  deleteOne,
  updateJobByID,
  fetchJobCategoryCount,
  fetchJobTypeCount,
};
