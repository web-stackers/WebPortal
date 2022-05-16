import axios from "axios";

// const uploadFile = async (data) => {
//   return await axios.post("/upload", data);
// };

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

// Fetch third party count
const fetchThirdpartyCount = async () => {
  return await axios.get("/secondaryUser/thirdparty/count");
};

export default {
  addNew,
  fetchThirdParty,
  updateThirdPartyByID,
  disableEnableThirdPartyByID,
  fetchThirdpartyCount,
};
