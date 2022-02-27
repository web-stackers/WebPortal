import axios from "axios";

const fetchConsumers = async () => {
  return await axios.get("/consumer");
};

export default {
  fetchConsumers,
};
