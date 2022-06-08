import axios from "axios";

const fetchJobAssignment = async () => {
  return await axios.get("/jobAssignment");
};

//Function is called when withdrawal is accepted by admin
const withdrawalAccepted = async (id) => {
  return await axios.patch(`/jobAssignment/withdrawlAccepted/${id}`);
};

//Function is called when withdrawal is rejected by admin
const withdrawalRejected = async (id) => {
  return await axios.patch(`/jobAssignment/withdrawlRejected/${id}`);
};

// Fetch completed job count
const fetchCompletedJobCount = async () => {
  return await axios.get("jobAssignment/completed/count");
};

// Fetch pending job count
const fetchPendingJobCount = async () => {
  return await axios.get("jobAssignment/get/pending/count");
};

export default {
  fetchJobAssignment,
  withdrawalAccepted,
  withdrawalRejected,
  fetchCompletedJobCount,
  fetchPendingJobCount,
};
