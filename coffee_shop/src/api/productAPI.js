import axiosInstance  from './axiosInstance';

export const getProducts = async ()=>{
        const response = await axiosInstance.get(`/products`);
        console.log(response);
        return response.data;
}