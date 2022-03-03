import axios from "axios";

const fetchJobCategory = async () => {
  return await axios.get("/jobTypeCategory");
};

const addNew = async (data) => {
  return await axios.post("/jobTypeCategory", data);
};

const deleteOne = async (id) => {
  return await axios.delete(`/jobTypeCategory/${id}`);
};

export default {
  fetchJobCategory,
  addNew,
  deleteOne,
};
