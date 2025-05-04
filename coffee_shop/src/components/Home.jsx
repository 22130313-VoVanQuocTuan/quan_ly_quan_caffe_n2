import React, { useEffect, useState } from "react";
// Import Header và CSS
import Header from "./header/header";
import "./home.css";

// Import các icon
import { search, person, numbers, kitchent, close } from "../assets/icons";

// Import các hàm API
import { getUserInfo } from "../api/authApi";
import {
  addItemToOrder,
  confirmCreateMenu,
  createOrder,
  getOrderItems,
} from "../api/orderAPI";
import { checkProduct, getProducts } from "../api/productAPI";

// // Đóng modal thêm món
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
  }
}
// Mở modal nhắc người dùng tạo thực đơn
function openMessage() {
  const modalMess = document.getElementById("modalMessage");
  if (modalMess) {
    modalMess.style.display = "block";
  }
}
// Đóng modal tạo thực đơn
function closeModalMessage() {
  const modalMess = document.getElementById("modalMessage");
  if (modalMess) {
    modalMess.style.display = "none";
  }
}
const Home = () => {
  // State quản lý
  const [canChooseItems, setCanChooseItems] = useState(false); // Người dùng có được chọn món chưa?
  const [userInfo, setUserInfo] = useState(null); // Thông tin người dùng
  const [dataProduct, setProduct] = useState([]); // Danh sách sản phẩm
  const [dataOrderItems, setOrderItems] = useState([]); // Danh sách món đã chọn
  const [productId, setProductId] = useState(null); // ID món khi click
  const [price, setPrice] = useState(0.0); // Giá món được chọn
  const [quantity, setQuantity] = useState(1); // Số lượng món muốn chọn
  const [subtotal, setSubtotal] = useState(0.0); // tổng tiền

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi 3 API song song: user, sản phẩm, đơn hàng
        const results = await Promise.allSettled([
          getUserInfo(), // Lấy thông tin người dùng
          getProducts(), // Lấy danh sách sản phẩm
        ]);

        const [userInfoResult, productsResult] = results;

        // Xử lý thông tin người dùng
        if (userInfoResult.status === "fulfilled") {
          setUserInfo(userInfoResult.value);
        }

        // Xử lý danh sách sản phẩm
        if (productsResult.status === "fulfilled") {
          setProduct(productsResult.value.data);
        }
      } catch (error) {
        console.error("Lỗi không xác định:", error);
      }
    };

    fetchData();
  }, []); // chạy lại khi dataOrderItems thay đổi
  // Lấy danh sách món trong đơn hàng
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const orderItemsResult = await getOrderItems();
        const orderItems = orderItemsResult.data;
        setOrderItems(orderItems);

        if (orderItems && orderItems.length > 0) {
          setCanChooseItems(true);
          const total = orderItems.reduce(
            (acc, item) => acc + (parseInt(item.subtotal) || 0),
            0
          );
          setSubtotal(total);
        } else {
          setSubtotal(0);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách món:", error);
      }
    };

    fetchOrderItems();
  }, []); // Chỉ chạy một lần khi component mount

  // Xử lý khi click vào món để mở modal
  const openModelConfirm = async (productId, price) => {
    setProductId(productId);
    setPrice(price);

    if (!canChooseItems) return; // Ngăn mở modal nếu chưa nhấn "Tạo thực đơn"

    try {
      // Gọi API kiểm tra số lượng sản phẩm
      const checkResult = await checkProduct(productId); // gọi API kiểm tra số lượng
      if (checkResult && checkResult.data.available) {
        // nếu còn
        const modal = document.getElementById("modal");
        if (modal) {
          modal.style.display = "block";
        }
      } else {
        alert("Sản phẩm hiện không khả dụng hoặc hết hàng!"); // Show error message
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra sản phẩm:", error);
      alert("Đã có lỗi xảy ra khi kiểm tra sản phẩm!");
    }
  };

  // Xử lý xác nhận thực đơn
  const confirmOrder = async () => {
    try {
      const response = await confirmCreateMenu(subtotal);
      if (response.code === 0) {
        // Điều chỉnh để khớp với backend
        alert(response.msg || "Xác nhận thực đơn thành công");
      } else {
        alert(response.msg || "Xác nhận thực đơn thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận thực đơn:", error);
      alert(error.msg || "Đã có lỗi xảy ra khi xác nhận thực đơn!");
    }
  };

  // Xử lý thêm món vào đơn hàng
  const handleAddItemToOrder = async () => {
    try {
      await addItemToOrder(productId, quantity, price);
      const response = await getOrderItems(); // Lấy danh sách món mới
      const orderItems = response.data;
      setOrderItems(orderItems);
      if (orderItems && orderItems.length > 0) {
        setCanChooseItems(true);
        const total = orderItems.reduce(
          (acc, item) => acc + (parseInt(item.subtotal) || 0),
          0
        );
        setSubtotal(total);
      } else {
        setSubtotal(0);
      }
      closeModal();
      alert("Thêm món thành công");
    } catch (error) {
      console.error("Lỗi khi thêm món:", error);
      alert("Đã có lỗi xảy ra khi thêm món!");
    }
  };

  return (
    <div>
      {/* Component Header */}
      <Header />
      <div className="body">
        {/* Phần bên trái: hiển thị danh sách sản phẩm */}
        <div className="left">
          <div className="coffe">
            <span>Coffe</span>
          </div>
          {/* Thanh tìm kiếm */}
          <div className="search">
            <div className="input-container">
              <input type="text" placeholder="Nhập tên món" />
              <img src={search} alt="search" className="search-icon" />
            </div>
          </div>
          {/* Danh sách sản phẩm */}
          <div className="listP">
            {dataProduct.map((item) => (
              <div
                className="item"
                key={item.id}
                onClick={() => openModelConfirm(item.id, item.price)} // Mở modal khi click
              >
                <img src={item.imageUrl} alt={item.name} />
                <div className="footer">
                  <label htmlFor="">{item.name}</label>
                  <label htmlFor="">
                    {parseInt(item.price).toLocaleString()}đ
                  </label>{" "}
                  {/* Định dạng giá */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phần bên phải: thông tin đơn hàng và người dùng */}
        <div className="right">
          <div className="head1">
            <div className="addP">
              <button>Thêm món mới</button> {/* Nút thêm món mới */}
            </div>
            {/* Hiển thị thông tin người dùng */}
            <div className="person">
              <label htmlFor="">
                {userInfo?.data?.username
                  ? `${userInfo.data.username} (${userInfo.data.role})`
                  : ""}
              </label>
              <img src={person} alt="person" />
            </div>
          </div>
          {/* Dropdown chọn bàn */}
          <div className="content2">
            <select id="ban">
              <option value="">Bàn 1</option>
              <option value="">Bàn 2</option>
              <option value="">Bàn 3</option>
              <option value="">Bàn 4</option>
              <option value="">Bàn 5</option>
            </select>

            {/* Số lượng khách */}
            <div className="number">
              <img src={numbers} alt="" />
              <label htmlFor="">5</label> {/* số lượng khách */}
            </div>
          </div>
          {/* Bảng danh sách món trong đơn hàng */}
          <div className="content3">
            <table>
              <thead>
                <tr>
                  <th>Tên món</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {dataOrderItems && dataOrderItems.length > 0 ? (
                  dataOrderItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item?.productName || ""}</td>
                      <td>{item?.quantity ?? ""}</td>
                      <td>
                        {item?.subtotal != null
                          ? parseInt(item.subtotal).toLocaleString() + " đ"
                          : ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      Không có món nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Tổng tiền */}
          <div className="total">
            <label htmlFor="">Tổng tiền: </label>
            <label id="price">{subtotal.toLocaleString()} đ</label>
          </div>

          {/* Các nút chức năng */}
          <div className="content4">
            <div className="section1">
              <button
                className="create"
                onClick={() => {
                  openMessage();
                }}
              >
                Tạo thực đơn
              </button>
              <button
                className="confirm"
                onClick={() => {
                  confirmOrder();
                }}
              >
                Xác nhận thực đơn
              </button>
            </div>
            <div className="section2">
              <button className="send">
                <img src={kitchent} alt="" />
                <label htmlFor="">Gửi</label>
              </button>
              <button className="close">
                <img src={close} alt="" />
                <label htmlFor="">Hủy bỏ</label>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal xác nhận món */}
      <div className="modal" id="modal">
        <label htmlFor="">Thêm món này vào thực đơn</label>
        <input
          type="number"
          name=""
          id="number"
          placeholder="số lượng"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <div className="bt">
          <button onClick={handleAddItemToOrder}>Đồng ý</button>
          <button onClick={() => closeModal()}>Hủy</button>
        </div>
      </div>

      {/* Modal thông báo chọn món */}
      <div className="modal" id="modalMessage">
        <label htmlFor="">Vui lòng chọn món</label>
        <div className="bt">
          <button
            onClick={async () => {
              try {
                await createOrder(); // Gọi API tạo thực đơn
                setCanChooseItems(true);
                await getOrderItems();
                closeModalMessage(); // Đóng modal sau khi tạo xong
              } catch (error) {
                console.error("Lỗi tạo thực đơn:", error);
              }
            }}
          >
            Oke
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
