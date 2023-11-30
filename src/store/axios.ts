import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:80',
})

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export default instance;
