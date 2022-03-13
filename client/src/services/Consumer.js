import axios from "axios";

// Fetch all consumers
const fetchConsumers = async () => {
  return await axios.get("/consumer");
};

// Disable or Enable consumer
const ableConsumer = async (id) => {
  return await axios.patch(`/consumer/${id}`)
};

// Fetch consumer by id
const fetchConsumer = async (id) => {
  return await axios.get(`/consumer/${id}`)
}

// Search consumer
const searchConsumer = async (key) => {
  return await axios.get(`/consumer/search/${key}`)
}

export default {
  fetchConsumers,
  ableConsumer,
  fetchConsumer,
  searchConsumer
};
