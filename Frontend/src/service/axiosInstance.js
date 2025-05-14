// src/api/axiosInstance.ts
import axios from 'axios';

const  axiosInstance  = axios.create({
  baseURL: 'http://localhost:8080/n2', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true //cho phép gửi cookie (chứa session id) sang backend
});

export default axiosInstance ;