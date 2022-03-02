import axios from "axios";

const addNew = async (data) => {
  return await axios.post("/secondaryUser", data);
};

const fetchThirdParty = async () => {
  return await axios.get("/secondaryUser");
};

// const fetchThirdPartyByID = async (id) => {
//   return await axios.get(`/secondaryUser/${id}`);
// };

const updateThirdPartyByID = async (id) => {
  return await axios.patch(`/secondaryUser/update/${id}`);
};

const disableEnableThirdPartyByID = async (id) => {
  return await axios.patch(`/secondaryUser/disable/${id}`);
};

export default {
  addNew,
  fetchThirdParty,
  // fetchThirdPartyByID,
  updateThirdPartyByID,
  disableEnableThirdPartyByID,
};
