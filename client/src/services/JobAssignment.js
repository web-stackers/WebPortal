import axios from "axios";

const fetchJobAssignment = async () => {
  return await axios.get("/jobAssignment");
};

const withdrawalAccepted = async (id) => {
  return await axios.patch(`/jobAssignment/withdrawlAccepted/${id}`);
};

const withdrawalRejected = async (id) => {
  return await axios.patch(`/jobAssignment/withdrawlRejected/${id}`);
};

// Fetch completed job count
const fetchCompletedJobCount = async () => {
  return await axios.get("jobAssignment/completed/count");
}

// Fetch pending job count
const fetchPendingJobCount = async () => {
  return await axios.get("jobAssignment/get/pending/count");
}


// const withdrawalRejected = async (id, data) => {
//   return await axios.patch(`/jobAssignment/withdrawlRejected/${id}`, data);
// };

export default {
  fetchJobAssignment,
  withdrawalAccepted,
  withdrawalRejected,
  fetchCompletedJobCount,
  fetchPendingJobCount,
};
