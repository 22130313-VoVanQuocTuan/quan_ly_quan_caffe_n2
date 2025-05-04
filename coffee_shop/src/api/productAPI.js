import axiosInstance  from './axiosInstance';

export const getProducts = async ()=>{
        const response = await axiosInstance.get(`/products`);
        console.log(response);
        return response.data;
}
export const checkProduct = async (productId)=>{
        const response = await axiosInstance.get(`/products/check/${productId}`);
        console.log(response);
        return response.data;
}