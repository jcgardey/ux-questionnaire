import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // or VITE_API_BASE_URL for Vite projects
  // You can add other default config here
});

//axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;
