import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

const signIn = (data) => API.post("/secondaryUser/signin", data);

//adding new third party user in the database
const addNew = async (data) => {
  return await API.post("/secondaryUser", data);
};

//Fetch all third party details
const fetchThirdParty = async () => {
  return await API.get("/secondaryUser");
};

//Edit third party detail
const updateThirdPartyByID = async (id, data) => {
  return await API.patch(`/secondaryUser/update/${id}`, data);
};

//Update third party detail
const updateProfile = async (id, data) => {
  return await API.patch(`/secondaryUser/profileUpdate/${id}`, data);
};

//disable or enable third party by id
const disableEnableThirdPartyByID = async (id) => {
  return await API.patch(`/secondaryUser/disable/${id}`);
};

// Fetch third party count
const fetchThirdpartyCount = async () => {
  return await API.get("/secondaryUser/thirdparty/count");
};

// Find email is unique or not
const emailUniqueCheck = async (email) => {
  return await API.get(`/secondaryUser/search/${email}`);
};

// Find mobile is unique or not
const mobileUniqueCheck = async (mobile) => {
  return await API.get(`/secondaryUser/search/mobile/${mobile}`);
};

// Fetch thirdparty verify document type
const fetchVerifyDocType = async (id) => {
  return await API.get(`/secondaryUser/verify/docType/${id}`);
};

export default {
  signIn,
  addNew,
  fetchThirdParty,
  updateThirdPartyByID,
  disableEnableThirdPartyByID,
  fetchThirdpartyCount,
  emailUniqueCheck,
  mobileUniqueCheck,
  updateProfile,
  fetchVerifyDocType,
};
