import axios from "axios";

const addNew = async (data) => {
  return await axios.post("/secondaryUser", data);
};

const fetchThirdParty = async () => {
  return await axios.get("/secondaryUser");
};

const updateThirdPartyByID = async (id, data) => {
  return await axios.patch(`/secondaryUser/update/${id}`, data);
};

const disableEnableThirdPartyByID = async (id) => {
  return await axios.patch(`/secondaryUser/disable/${id}`);
};

export default {
  addNew,
  fetchThirdParty,
  updateThirdPartyByID,
  disableEnableThirdPartyByID,
};
