// src/api/axiosInstance.ts
import axios from 'axios';

const  axiosInstance  = axios.create({
  baseURL: '/n2', // Proxy sẽ xử lý chuyển hướng đến backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true //cho phép gửi cookie (chứa session id) sang backend
});

export default axiosInstance ;