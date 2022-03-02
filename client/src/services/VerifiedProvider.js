import axios from "axios";

const fetchVerifiedProviders = async () => {
  return await axios.get("/provider/verified");
};

export default {
  fetchVerifiedProviders,
};
