import axios from "axios";

const addNew = async (data) => {
  return await axios.post("/secondaryUser", data);
};

const fetchThirdParty = async () => {
  return await axios.get("/secondaryUser");
};

export default {
  addNew,
  fetchThirdParty,
};
