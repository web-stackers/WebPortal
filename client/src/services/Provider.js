import axios from "axios";

const addNew = async (data) => {
  return await axios.post("/provider", data);
};

const fetchProviders = async () => {
  return await axios.get("/provider");
};

const ableProvider = async (id) => {
  return await axios.patch(`/provider/${id}`);
};

const fetchNewProviders = async () => {
  return await axios.get("/provider/new");
};

const fetchVerifiedProviders = async () => {
  return await axios.get("/provider/verified");
};

export default {
  addNew,
  fetchProviders,
  ableProvider,
  fetchNewProviders,
  fetchVerifiedProviders,
};
