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

// const withdrawalRejected = async (id, data) => {
//   return await axios.patch(`/jobAssignment/withdrawlRejected/${id}`, data);
// };

export default {
  fetchJobAssignment,
  withdrawalAccepted,
  withdrawalRejected,
};
