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
  return await axios.get(`/provider/${id}`)
}

const fetchNewProviders = async () => {
  return await axios.get("/provider/new");
};

const fetchVerifiedProviders = async () => {
  return await axios.get("/provider/verified");
};

const fetchDocumentList = async (id) => {
  return await axios.get(`/provider/document/${id}`);
};

// Search consumer
const searchProvider = async (key) => {
  return await axios.get(`/provider/search/${key}`)
}

export default {
  addNew,
  fetchProviders,
  ableProvider,
  fetchNewProviders,
  fetchVerifiedProviders,
  fetchDocumentList,
  searchProvider,
  fetchProvider
};
