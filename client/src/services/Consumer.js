import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// Fetch all consumers
const fetchConsumers = async () => {
  return await API.get("/consumer");
};

// Disable or Enable consumer
const ableConsumer = async (id) => {
  return await API.patch(`/consumer/able/${id}`);
};

// Fetch consumer by id
const fetchConsumer = async (id) => {
  return await API.get(`/consumer/${id}`);
};

// Search consumer
const searchConsumer = async (key) => {
  return await API.get(`/consumer/search/${key}`);
};

// fetch consumer total count
const fetchConsumerCount = async () => {
  return await API.get("/consumer/get/count");
};

export default {
  fetchConsumers,
  ableConsumer,
  fetchConsumer,
  searchConsumer,
  fetchConsumerCount,
};
