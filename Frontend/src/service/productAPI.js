import axiosInstance  from './axiosInstance';

export const getProducts = async ()=>{
        const response = await axiosInstance.get(`/products`);
        return response.data;
}
export const checkProduct = async (productId)=>{
        const response = await axiosInstance.get(`/products/check/${productId}`);
        //1.2.5.1.2 ProductAPI nhận dữ liệu và truyền đến giao diện menu.
        return response.data;  
}