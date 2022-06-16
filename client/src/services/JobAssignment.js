import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

const fetchJobAssignment = async () => {
  return await API.get("/jobAssignment");
};

//Function is called when withdrawal is accepted by admin
const withdrawalAccepted = async (id) => {
  return await API.patch(`/jobAssignment/withdrawlAccepted/${id}`);
};

//Function is called when withdrawal is rejected by admin
const withdrawalRejected = async (id) => {
  return await API.patch(`/jobAssignment/withdrawlRejected/${id}`);
};

// Fetch completed job count
const fetchCompletedJobCount = async () => {
  return await API.get("jobAssignment/completed/count");
};

// Fetch pending job count
const fetchPendingJobCount = async () => {
  return await API.get("jobAssignment/get/pending/count");
};

export default {
  fetchJobAssignment,
  withdrawalAccepted,
  withdrawalRejected,
  fetchCompletedJobCount,
  fetchPendingJobCount,
};
