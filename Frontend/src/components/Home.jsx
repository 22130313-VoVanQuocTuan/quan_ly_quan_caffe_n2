import React from 'react';
import Header from "./header/header";
import './home.css';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Chào mừng đến với Quán Cà Phê CoffeeShop</h1>
        <div className="flex flex-col items-center gap-6">
          {/* Hình ảnh chính */}
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
            alt="Coffee Shop"
            className="w-full max-w-3xl rounded-lg shadow-lg"
          />
          {/* Thông tin quán */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Quán Cà Phê CoffeeShop</h2>
            <p className="text-gray-600 mb-2">Địa chỉ: 1/11/15/Phường 13/Đặng Thùy Trâm/Bình Thạnh/TP.HCM</p>
            <p className="text-gray-600 mb-2">Giờ mở cửa: 7:00 AM - 10:00 PM</p>
            <p className="text-gray-600">Thưởng thức hương vị cà phê Việt Nam đậm đà, không gian ấm cúng và dịch vụ thân thiện.</p>
          </div>
          {/* Hình ảnh phụ (có thể thêm nếu cần) */}
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2062&auto=format&fit=crop"
              alt="Coffee Beans"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;