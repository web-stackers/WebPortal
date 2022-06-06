import axios from "axios";

const fetchComplaintsByConsumer = async () => {
  return await axios.get("/job/complaint/consumer");
};

const fetchComplaintsByProvider = async () => {
  return await axios.get("/job/complaint/provider");
};

const fetchComplaintsById = async (id) => {
  return await axios.get(`/job/complaints/${id}`);
};

const fetchJobByConsumerComplaints = async (id) => {
  return await axios.get(`/job/complaint/consumer/${id}`);
};

// Fetch job history of a user
const fetchUserJobs = async (type, id) => {
  return await axios.get(`/job/user/userjobs/${type}/${id}`);
};

// Fetch job withdrawals of a user
const fetchUserWithdrawals = async () => {
  return await axios.get("/job/user/userwithdrawals");
};

// Fetch complaint count
const fetchComplaintCount = async () => {
  return await axios.get("/job/complaint/count");
};

const complaintHandled = async (id, data) => {
  return await axios.patch(`/job/complaintHandled/${id}`, data);
};

export default {
  fetchComplaintsByConsumer,
  fetchComplaintsByProvider,
  fetchJobByConsumerComplaints,
  fetchComplaintsById,
  fetchUserJobs,
  fetchComplaintCount,
  complaintHandled,
  fetchUserWithdrawals,
};
