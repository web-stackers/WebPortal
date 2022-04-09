import axios from "axios";

const addNew = async (data) => {
  return await axios.post("/provider", data);
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
const updateDocumentRejected = async (id, docType) => {
  return await axios.patch(`/provider/documentRejected/${id}/${docType}`);
};

// Update document rejected reason
const updateDocumentRejectedReason = async (id, docType, reason) => {
  return await axios.patch(
    `/provider/documentRejected/reason/${id}/${docType}/${reason}`
  );
}

// Search consumer
const searchProvider = async (key) => {
  return await axios.get(`/provider/search/${key}`);
};

export default {
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
  updateDocumentRejectedReason,
};
