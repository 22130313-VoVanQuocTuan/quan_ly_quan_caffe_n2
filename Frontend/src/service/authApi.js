// src/api/userApi.js
import { data } from 'react-router-dom';
import axiosInstance  from './axiosInstance';

export const registerUser = async (userData) => {
    const response = await axiosInstance.post(`/user`, userData);
    return response.data;
  };

  export const login = async (userData) => {
    const response = await axiosInstance.post(`/user/login`, userData);
    return response.data;
  };
  export const logoutAuth = async () => {
    const response = await axiosInstance.post(`/user/logout`);
    return response.data;
  };

  // Hàm lấy thông tin người dùng từ session
  export const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/user/info');
      return response.data;
    } catch (error) {
      console.error('Lỗi lấy thông tin người dùng:', error.response?.data || error.message);
      throw error;
    }
  };