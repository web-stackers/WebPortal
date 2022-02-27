import axios from "axios";

const addNew = async (data) => {
  return await axios.post("/secondaryUser", data);
};

export default {
  addNew,
};
