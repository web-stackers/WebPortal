import axios from 'axios';

// Fetch all providers
const fetchProviders = async () => {
    return await axios.get('/provider');
};

// Disable or Enable provider
const ableProvider = async (id) => {
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