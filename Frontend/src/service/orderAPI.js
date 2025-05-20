import axiosInstance from './axiosInstance';

// tạo thực đơn
export const createOrder = async () => {
  try {
    const response = await axiosInstance.post(`/orders`);
     //1.2.3.2 OrderAPI nhận dữ liệu và truyền đến giao diện menu.
    return response.data;     
  } catch (error) {
    if (error.response) {
      //1.2.3.1.2.1 Giao diện menu bị đăng xuất nếu chưa đăng nhập (handleLogout())
        handleLogout();
    } 
  }
};

// đăng xuất nếu không có session
const handleLogout = () => {
  // Nếu có API logout server thì gọi trước
  axiosInstance.post("/user/logout").finally(() => {
    window.location.href = "/login"; // Redirect về login
  });
};


// 1.2.3.4 Hệ thống gọi API getOrderItem() để hiển thị món trong thực đơn khi có món đã được thêm vào thực đơn được định nghĩa trong orderAPI.
export const getOrderItems = async () => {
  const response = await axiosInstance.get(`/orders`);
  //1.2.3.4.2 OrderAPI nhận dữ liệu và truyền đến giao diện menu.
  return response.data;
}


// thêm món vào thực đơn
export const addItemToOrder = async (productId, quantity, price) => {
  const data = {
    productId: productId,
    quantity: quantity, // Số lượng nhập từ người dùng
    price: price
  };
    const response = await axiosInstance.post('/orders/order-items', data);
    return response.data; // 1.2.7.1.2 OrderAPI nhận dữ liệu và truyền đến giao diện menu.
  
};


export const confirmCreateMenu = async (totalPrice) => {
    const response = await axiosInstance.put(`/orders`, {
        totalPrice: totalPrice
    });
    //1.2.10.1.2 Truyền dữ liệu cho menu 
    return response.data;

};