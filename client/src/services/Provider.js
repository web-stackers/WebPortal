import axios from 'axios';

const fetchProviders = async () => {
    return await axios.get('/provider');
};

const ableProvider = async (id) => {
    return await axios.patch(`/provider/${id}`)
  };

export default {
    fetchProviders,
    ableProvider,
};