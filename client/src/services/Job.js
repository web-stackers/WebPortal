import axios from "axios";

const fetchComplaints = async () => {
  return await axios.get("/job");
};

const fetchComplaintsById = async (id) => {
  return await axios.get(`/job/complaints/${id}`);
};

const fetchUserJobs = async (type, id) => {
  return await axios.get(`/job/user/userjobs/${type}/${id}`)
}

// Fetch complaint count
const fetchComplaintCount = async () => {
  return await axios.get("/job/complaint/count");
};

export default {
  fetchComplaints,
  fetchComplaintsById,
  fetchUserJobs,
  fetchComplaintCount
};
