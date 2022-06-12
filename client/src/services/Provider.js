import axios from "axios";

// check whether the emai,mobile and nic are unique while registering
const validate = async (data) => {
  return await axios.post("/provider/register/validate", data);
};
// Register new provider
const addNew = async (data) => {
  return await axios.post("/provider/register", data);
};

// Fetch all providers
const fetchProviders = async () => {
  return await axios.get("/provider");
};

// Disable or Enable provider
const ableProvider = async (id) => {
  return await axios.patch(`/provider/able/${id}`);
};

// Fetch provider by id
const fetchProvider = async (id) => {
  return await axios.get(`/provider/${id}`);
};

//Fetch new providers
const fetchNewProviders = async () => {
  return await axios.get("/provider/new");
};

// Fetch verified providers
const fetchVerifiedProviders = async () => {
  return await axios.get("/provider/verified");
};

//Fetch documentlist of a provider
const fetchDocumentList = async (id) => {
  return await axios.get(`/provider/document/${id}`);
};

// Fetch verified provider count
const fetchVerifiedProviderCount = async () => {
  return await axios.get("/provider/count");
};

// Update when document is accepted
const updateDocumentAccepted = async (id, docType) => {
  return await axios.patch(`/provider/documentAccepted/${id}/${docType}`);
};

// Update when document is rejected
const updateDocumentRejected = async (id, docType, reason) => {
  return await axios.patch(
    `/provider/documentRejected/${id}/${docType}/${reason}`
  );
};

// Search consumer
const searchProvider = async (key) => {
  return await axios.get(`/provider/search/${key}`);
};

// Update verification
const updateVerification = async (id, result) => {
  return await axios.patch(`/provider/updateVerification/${id}/${result}`);
};

// Update provider count when enable or disable by admin
const updateProviderCount = async (id) => {
  return await axios.patch(`/provider/providerCountUpdate/${id}`);
};

// Fetch a particular document
const fetchDocument = async (id, docType) => {
  return await axios.patch(`/provider/get/document/${id}/${docType}`);
};

// Update qualification
const updateQualification = async (id, qualification) => {
  return await axios.patch(
    `/provider/update/qualification/${id}/${qualification}`
  );
};

export default {
  validate,
  addNew,
  fetchProviders,
  ableProvider,
  fetchNewProviders,
  fetchVerifiedProviders,
  fetchDocumentList,
  searchProvider,
  fetchProvider,
  fetchVerifiedProviderCount,
  updateDocumentAccepted,
  updateDocumentRejected,
  updateVerification,
  updateProviderCount,
  fetchDocument,
  updateQualification,
};
