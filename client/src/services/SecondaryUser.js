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

const signIn = (data) => axios.post("/secondaryUser/signin", data);

// when pressing the forgot password button in signin 
const forgotPassword = (data) => axios.post("/secondaryUser/forgotPassword", data);

// when pressing the change password button in change new password screen
const changePassword = (data,id) => axios.post(`/secondaryUser/changePassword/${id}`, data);

// To verify the OTP entered by the secondaryUser to change password
const verifyOTP = async (data) => {
  return await axios.post("/secondaryUser/forgotPassword/verifyOTP", data);
};

// To resend the OTP if code has expired or something went wrong
const resendOTP = async (data) => {
  return await axios.post("/secondaryUser/forgotPassword/resendOTP", data);
};

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

// Sending the queries to the admin by thirdparty
const sendMail = async (id, issue) => {
  return await API.post(`/secondaryUser/mail/${id}/${issue}`);
}

export default {
  signIn,
  forgotPassword,
  verifyOTP,
  resendOTP,
  changePassword,
  addNew,
  fetchThirdParty,
  updateThirdPartyByID,
  disableEnableThirdPartyByID,
  fetchThirdpartyCount,
  emailUniqueCheck,
  mobileUniqueCheck,
  updateProfile,
  fetchVerifyDocType,
  sendMail,
};
