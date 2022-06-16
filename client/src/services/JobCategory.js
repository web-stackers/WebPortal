import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

//Fetch all job categories from job category collection
const fetchJobCategory = async () => {
  return await API.get("/jobTypeCategory");
};

const fetchJob = async (id) => {
  return await API.get(`/jobTypeCategory/${id}`);
};

//Update job type category collection by id
const updateJobByID = async (id, data) => {
  return await API.patch(`/jobTypeCategory/update/${id}`, data);
};

//Adding new job type category
const addNew = async (data) => {
  return await API.post("/jobTypeCategory", data);
};

//delete one job type category
const deleteOne = async (id) => {
  return await API.delete(`/jobTypeCategory/${id}`);
};

// Fetch job category count
const fetchJobCategoryCount = async () => {
  return await API.get("/jobTypeCategory/category/count");
};

// Fetch job type count
const fetchJobTypeCount = async () => {
  return await API.get("/jobTypeCategory/type/count");
};

// Find jobType is unique or not
const jobTypeUniqueCheck = async (jobType) => {
  return await API.get(`/jobTypeCategory/search/${jobType}`);
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
