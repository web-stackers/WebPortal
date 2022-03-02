import axios from "axios";

const fetchJobAssignment = async () => {
  return await axios.get("/jobAssignment");
};

const withdrawalAccepted = async (id) => {
  return await axios.patch(`/jobAssignment/withdrawlAccepted/${id}`);
};

export default {
  fetchJobAssignment,
  withdrawalAccepted,
};
