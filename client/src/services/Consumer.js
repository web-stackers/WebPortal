import axios from "axios";

const fetchConsumers = async () => {
  return await axios.get("/consumer");
};

const ableConsumer = async (id) => {
  return await axios.patch(`/consumer/${id}`)
};

export default {
  fetchConsumers,
  ableConsumer,
};
