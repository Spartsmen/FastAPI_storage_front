import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:80',
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('access_token');
  return config;
})

export default instance;
