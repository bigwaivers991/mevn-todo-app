import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',  // CHANGED FROM 4000 TO 5000
  withCredentials: true
});

export default api;