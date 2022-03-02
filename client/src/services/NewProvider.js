import axios from "axios";

const fetchNewProviders = async () => {
  return await axios.get("/provider/new");
};

export default {
  fetchNewProviders,
};
