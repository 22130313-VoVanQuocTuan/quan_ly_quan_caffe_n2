import axiosInstance from './axiosInstance';

// tạo thực đơn
export const createOrder = async () => {
  try {
    const response = await axiosInstance.post(`/orders`);
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Session không hợp lệ → Logout
      handleLogout();
    } else {
      console.error("Lỗi tạo thực đơn:", error);
    }
    throw error;
  }
};

// đăng xuất nếu không có session
const handleLogout = () => {
  // Nếu có API logout server thì gọi trước
  axiosInstance.post("/user/logout").finally(() => {
    window.location.href = "/login"; // Redirect về login
  });
};


// Lấy danh sách các item trong thực đơn
export const getOrderItems = async () => {
  const response = await axiosInstance.get(`/orders`);
  return response.data;
}


// thêm món vào thực đơn
export const addItemToOrder = async (productId, quantity, price) => {
  const data = {
    productId: productId,
    quantity: quantity, // Số lượng nhập từ người dùng
    price: price
  }; try {
    const response = await axiosInstance.post('/orders/order-items', data);
    return response.data; // Trả về dữ liệu từ phản hồi API
  } catch (error) {
    console.error("Error adding item to order:", error);
    return null;
  }
};


export const confirmCreateMenu = async (totalPrice) => {
  try {
    const response = await axiosInstance.put(`/orders`, { totalPrice });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xác nhận thực đơn");
  }
};