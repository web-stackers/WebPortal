import axios from "axios";

const fetchJobAssignment = async () => {
  return await axios.get("/jobAssignment");
};

export default {
  fetchJobAssignment,
};
