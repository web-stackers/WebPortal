import axios from "axios";

const fetchComplaints = async () => {
  return await axios.get("/job");
};

const fetchComplaintsById = async (id) => {
  return await axios.get(`/job/complaints/${id}`);
};

export default {
  fetchComplaints,
  fetchComplaintsById,
};
