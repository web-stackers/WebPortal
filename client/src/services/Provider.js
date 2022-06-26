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

// check whether the emai,mobile and nic are unique while registering
const validate = async (data) => {
  return await axios.post("/provider/register/validate", data);
};
// Register new provider with basic details
const addNew = async (data) => {
  return await axios.post("/provider/register", data);
};

// To verify the OTP entered by the new provider to verify email
const verifyOTP = async (data) => {
  return await axios.post("/provider/register/verifyOTP", data);
};

// To resend the OTP if code has expired or something went wrong
const resendOTP = async (data) => {
  return await axios.post("/provider/register/resendOTP", data);
};
// upadate new provider after documents upload
const docUpload = async (data, id) => {
  return await axios.post(`/provider/register/upload/${id}`, data);
};

// Fetch all providers
const fetchProviders = async () => {
  return await API.get("/provider");
};

// Disable or Enable provider
const ableProvider = async (id) => {
  return await API.patch(`/provider/able/${id}`);
};

// Fetch provider by id
const fetchProvider = async (id) => {
  return await API.get(`/provider/${id}`);
};

//Fetch new providers
const fetchNewProviders = async (docType) => {
  return await API.get(`/provider/new/${docType}`);
};

// Fetch verified providers
const fetchVerifiedProviders = async (docType) => {
  return await API.get(`/provider/verified/${docType}`);
};

//Fetch documentlist of a provider
const fetchDocumentList = async (id) => {
  return await API.get(`/provider/document/${id}`);
};

// Fetch provider by id for mobile app
const fetchProviderById = async (id) => {
  return await API.get(`/provider/mobile/${id}`);
};

// Fetch verified provider count
const fetchVerifiedProviderCount = async () => {
  return await API.get("/provider/count");
};

// Update when document is accepted
const updateDocumentAccepted = async (id, docType) => {
  return await API.patch(`/provider/documentAccepted/${id}/${docType}`);
};

// Update when document is rejected
const updateDocumentRejected = async (id, docType, reason) => {
  return await API.patch(
    `/provider/documentRejected/${id}/${docType}/${reason}`
  );
};

// Search consumer
const searchProvider = async (key) => {
  return await API.get(`/provider/search/${key}`);
};

// Update verification
const updateVerification = async (id, result, thirdPartyId) => {
  return await API.patch(
    `/provider/updateVerification/${id}/${result}/${thirdPartyId}`
  );
};

// Update provider count when enable or disable by admin
const updateProviderCount = async (id) => {
  return await API.patch(`/provider/providerCountUpdate/${id}`);
};

// Update qualification
const updateQualification = async (id, qualification) => {
  return await API.patch(
    `/provider/update/qualification/${id}/${qualification}`
  );
};

// Delete rejected provider
const deleteRejectedProvider = async (id) => {
  return await API.delete(`/provider/${id}`);
};

export default {
  validate,
  addNew,
  verifyOTP,
  resendOTP,
  docUpload,
  fetchProviders,
  ableProvider,
  fetchNewProviders,
  fetchVerifiedProviders,
  fetchDocumentList,
  fetchProviderById,
  searchProvider,
  fetchProvider,
  fetchVerifiedProviderCount,
  updateDocumentAccepted,
  updateDocumentRejected,
  updateVerification,
  updateProviderCount,
  updateQualification,
  deleteRejectedProvider,
};
