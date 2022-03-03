import axios from "axios";

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
  fetchProviders,
  ableProvider,
  fetchNewProviders,
  fetchVerifiedProviders,
};
