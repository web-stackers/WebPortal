import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

const fetchComplaintsByConsumer = async () => {
  return await API.get("/job/complaint/consumer");
};

const fetchComplaintsByProvider = async () => {
  return await API.get("/job/complaint/provider");
};

const fetchComplaintsById = async (id) => {
  return await API.get(`/job/complaints/${id}`);
};

const fetchJobByConsumerComplaints = async (id) => {
  return await API.get(`/job/complaint/consumer/${id}`);
};

// Fetch job history of a user
const fetchUserJobs = async (type, id) => {
  return await API.get(`/job/user/userjobs/${type}/${id}`);
};

// Fetch job history of a user using assignments
const fetchUserJobsAssignments = async (type, id) => {
  return await API.get(`/job/user/userassignments/${type}/${id}`);
};

// Fetch job withdrawals of a user
const fetchUserWithdrawals = async () => {
  return await API.get("/job/user/userwithdrawals");
};

// Fetch complaint count
const fetchComplaintCount = async () => {
  return await API.get("/job/complaint/count");
};

const complaintHandled = async (id, data) => {
  return await API.patch(`/job/complaintHandled/${id}`, data);
};

export default {
  fetchComplaintsByConsumer,
  fetchComplaintsByProvider,
  fetchJobByConsumerComplaints,
  fetchComplaintsById,
  fetchUserJobs,
  fetchUserJobsAssignments,
  fetchComplaintCount,
  complaintHandled,
  fetchUserWithdrawals,
};
