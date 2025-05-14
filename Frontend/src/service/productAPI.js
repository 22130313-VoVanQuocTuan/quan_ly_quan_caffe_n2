import axiosInstance  from './axiosInstance';

export const getProducts = async ()=>{
        const response = await axiosInstance.get(`/products`);
        console.log(response);
        return response.data;
}
export const checkProduct = async (productId)=>{
        const response = await axiosInstance.get(`/products/check/${productId}`);
        console.log(response);
        //1.2.5.1.2 ProductAPI nhận dữ liệu và truyền đến giao diện menu.
        return response.data;  
}