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
<<<<<<< HEAD
    return await axios.patch(`/provider/${id}`)
};

// Fetch provider by id
const fetchProvider = async (id) => {
    return await axios.get(`/provider/${id}`)
};

// Search provider
const searchProvider = async (key) => {
    return await axios.get(`/provider/search/${key}`)
};

export default {
    fetchProviders,
    ableProvider,
    fetchProvider,
    searchProvider
};
=======
  return await axios.patch(`/provider/${id}`);
};

const fetchNewProviders = async () => {
  return await axios.get("/provider/new");
};

const fetchVerifiedProviders = async () => {
  return await axios.get("/provider/verified");
};

const fetchDocumentList = async (id) => {
  return await axios.get(`/provider/document/${id}`);
}

export default {
  addNew,
  fetchProviders,
  ableProvider,
  fetchNewProviders,
  fetchVerifiedProviders,
  fetchDocumentList,
};
>>>>>>> 49633af565f4b1cc75d1c696fce97484df7c04c2
