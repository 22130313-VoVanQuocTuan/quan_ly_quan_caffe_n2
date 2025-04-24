// src/api/userApi.js
import axiosInstance  from './axiosInstance';

export const registerUser = async (userData) => {
    const response = await axiosInstance.post(`/user`, userData);
    return response.data;
  };

  export const login = async (userData) => {
    const response = await axiosInstance.post(`/user/login`, userData);
    return response.data;
  };