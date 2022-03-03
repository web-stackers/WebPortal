import axios from "axios";

const fetchJobCategory = async () => {
  return await axios.get("/jobTypeCategory");
};

const addNew = async (data) => {
  return await axios.post("/jobTypeCategory", data);
};

export default {
  fetchJobCategory,
  addNew,
};
