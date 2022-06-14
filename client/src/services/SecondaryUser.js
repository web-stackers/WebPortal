import axios from "axios";

//adding new third party user in the database
const addNew = async (data) => {
  return await axios.post("/secondaryUser", data);
};

//Fetch all third party details
const fetchThirdParty = async () => {
  return await axios.get("/secondaryUser");
};

//Edit third party detail
const updateThirdPartyByID = async (id, data) => {
  return await axios.patch(`/secondaryUser/update/${id}`, data);
};

//Update third party detail
const updateProfile = async (id, data) => {
  return await axios.patch(`/secondaryUser/profileUpdate/${id}`, data);
};

//disable or enable third party by id
const disableEnableThirdPartyByID = async (id) => {
  return await axios.patch(`/secondaryUser/disable/${id}`);
};

// Fetch third party count
const fetchThirdpartyCount = async () => {
  return await axios.get("/secondaryUser/thirdparty/count");
};

// Find email is unique or not
const emailUniqueCheck = async (email) => {
  return await axios.get(`/secondaryUser/search/${email}`);
};

// Find mobile is unique or not
const mobileUniqueCheck = async (mobile) => {
  return await axios.get(`/secondaryUser/search/mobile/${mobile}`);
};

export default {
  addNew,
  fetchThirdParty,
  updateThirdPartyByID,
  disableEnableThirdPartyByID,
  fetchThirdpartyCount,
  emailUniqueCheck,
  mobileUniqueCheck,
  updateProfile,
};
