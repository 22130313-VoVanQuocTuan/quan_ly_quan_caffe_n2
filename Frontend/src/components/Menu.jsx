import React, { useEffect, useState } from "react";
// Import Header và CSS
import Header from "./header/header";
import "./menu.css";

// Import các icon
import { search, person, numbers, kitchent, close } from "../assets/icons";

// Import các hàm API
import { getUserInfo } from "../service/authApi";

// Import useNavigate từ react-router-dom
import { useNavigate } from "react-router-dom";

import {
  addItemToOrder,
  confirmCreateMenu,
  createOrder,
  getOrderItems,
} from "../service/orderAPI";
import { checkProduct, getProducts } from "../service/productAPI";

// 1.2.8.1 Giao diện menu đóng form xác nhận món.
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
  }
}
// 1.2.2	Hiển thị thông báo chọn món ở giao diện menu (openMessage()).
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
const Menu = () => {
  // State quản lý
  const [canChooseItems, setCanChooseItems] = useState(false); // Người dùng có được chọn món chưa?
  const [userInfo, setUserInfo] = useState(null); // Thông tin người dùng
  const [dataProduct, setProduct] = useState([]); // Danh sách sản phẩm
  const [dataOrderItems, setOrderItems] = useState([]); // Danh sách món đã chọn
  const [productId, setProductId] = useState(null); // ID món khi click
  const [price, setPrice] = useState(0.0); // Giá món được chọn
  const [quantity, setQuantity] = useState(1); // Số lượng món muốn chọn
  const [subtotal, setSubtotal] = useState(0.0); // tổng tiền
  const navigate = useNavigate(); // Dùng để điều hướng đến các trang khác


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
      const checkResult = await checkProduct(productId); // 1.2.5.1 Hệ thống kiểm tra món còn hay hết bằng cách gọi API checkProduct(productId) được định nghĩa trong ProductAPI (Frontend). 
      if (checkResult && checkResult.data.available) {
        // nếu còn
        const modal = document.getElementById("modal");
        if (modal) {
          modal.style.display = "block";  // 1.2.5.3 Giao diện hiển thị form xác nhận món nếu còn món.
        }
      } else {
        //1.2.A2: Hệ thống hiển thị thông báo: "Món không tồn tại trong menu."
        alert("Món không tồn tại trong menu."); // 1.2.5.2 Giao diện hiển thị thông báo nếu hết món .
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra sản phẩm:", error);
      alert("Đã có lỗi xảy ra khi kiểm tra sản phẩm!");
    }
  };

  // Xử lý xác nhận thực đơn
  const confirmOrder = async () => {
    try {
      // 1.2.10.1 Hệ thống yêu cầu xác nhận thực đơn bằng cách gọi API confirmCreateMenu(subtotal) được định nghĩa trong OrderAPI (Frontend). 
      const response = await confirmCreateMenu(subtotal); 
     
      //1.2.10.2 Giao diện menu hiển thị thông báo thành công hoặc thất bại.
      if (response.code === 0) {
        alert(response.msg || "Xác nhận thực đơn thành công"); 
      } else {
        alert(response.msg || "Xác nhận thực đơn thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận thực đơn:", error);
      //1.2.B2: Hệ thống hiển thị thông báo: "Lỗi hệ thống, không thể xác nhận đơn hàng."
      alert(error.msg || "Lỗi hệ thống, không thể xác nhận đơn hàng."); 
    }
  };

  // Xử lý thêm món vào đơn hàng
  const handleAddItemToOrder = async () => {
    try {
      await addItemToOrder(productId, quantity, price);  //1.2.7.1 Hệ thống yêu cầu thêm món bằng cách gọi API addItemOrder(productId, quantity, price) được định nghĩa trong OrderAPI (Frontend). 
      const response = await getOrderItems(); // Lấy danh sách món mới
      const orderItems = response.data;
      setOrderItems(orderItems);
      if (orderItems && orderItems.length > 0) {
        setCanChooseItems(true);
        const total = orderItems.reduce(
          (acc, item) => acc + (parseInt(item.subtotal) || 0),
          0
        );
        //1.2.9 Giao diện menu cập nhật lại tổng tiền của thực đơn. 
        setSubtotal(total);   
      } else {
        setSubtotal(0);
      }
      //1.2.7.2 Giao diện menu đóng form xác nhận món và hiển thị thông báo thành công/thất bại.
      closeModal();
      alert("Thêm món thành công"); 
    } catch (error) {
      console.error("Thêm thất bại:", error); 
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
          {/*1.2.4 Nhân viên phục vụ tìm kiếm và chọn món trên giao diện menu (Frontend). /}
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
                onClick={() => openModelConfirm(item.id, item.price)} // 1.2.5 Nhân viên phục vụ chọn món trên giao diện menu. 
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
              <button onClick={() => navigate("/add-item")}>Thêm món mới</button> {/* Nút thêm món mới */}
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
            
          {/* Bảng danh sách món trong đơn hàng */}
          {/*1.2.3.3 Giao diện menu hiển thị thực đơn vừa được tạo.*/}
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
            {/*1.2.1	Phục vụ nhấn tạo thực đơn ở giao diện menu phía frontend.*/}
              <button
                className="create"
                onClick={() => {
                  openMessage();
                }}
              >
                Tạo thực đơn
              </button>

              {/*1.2.10 Nhân viên phục vụ nhấn xác nhận thực đơn trên giao diện menu. */}
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
                {/*1.2.11 Nhân viên phục vụ gửi hóa đơn cho bếp trên giao diện menu. */}
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
        {/*1.2.6 Nhân viên phục vụ nhập số lượng món trong form xác nhận. */}
        <input
          type="number"
          name=""
          id="number"
          placeholder="số lượng"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <div className="bt">
          <button onClick={handleAddItemToOrder}>Đồng ý</button> {/*1.2.7 Nhân viên phục vụ nhấn Đồng ý trên form xác nhận món. */}
          <button onClick={() => closeModal()}>Hủy</button> {/*1.2.8 Nhân viên phục vụ nhấn Hủy trên form xác nhận món nếu không chọn món. */}
        </div>
      </div>

      {/* Modal thông báo chọn món */}
      <div className="modal" id="modalMessage">
        <label htmlFor="">Vui lòng chọn món</label>
        <div className="bt">
          {/*1.2.3	Phục vụ nhấn ok trên thông báo để tạo thực đơn*/}
          <button
            onClick={async () => {
              try {
                await createOrder(); // 1.2.3.1 Yêu cầu hệ thống tạo thực đơn bằng cách gọi api tạo thực đơn createOrder() được định nghĩa ở OrderAPI
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
export default Menu;
