import React, { useState } from 'react'
import './header.css'
import { menu, order, stock,  staff, doanhthu, bep, logout } from '../../assets/icons';
import {  useNavigate } from "react-router-dom";


const Header = () => {
  const [active, setActive] = useState('menu');
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Ví dụ: xóa token ở đây
    localStorage.removeItem("token");
    navigate("/login"); // Chuyển trang
  };
  return (
    <div className="header">
      <ul className="head">
        <li className={active === 'menu' ? 'active' : ''} onClick={() => setActive('menu')}>
          <button><img src={menu} alt="menu" /> Menu</button>
        </li>
        <li className={active === 'order' ? 'active' : ''} onClick={() => setActive('order')}>
          <button><img src={order} alt="order" /> Order</button>
        </li>
        <li className={active === 'stock' ? 'active' : ''} onClick={() => setActive('stock')}>
          <button><img src={stock} alt="stock" /> Kho hàng</button>
        </li>
        <li className={active === 'staff' ? 'active' : ''} onClick={() => setActive('staff')}>
          <button><img src={staff} alt="staff" /> Nhân viên</button>
        </li>
        <li className={active === 'doanhthu' ? 'active' : ''} onClick={() => setActive('doanhthu')}>
          <button><img src={doanhthu} alt="doanhthu" /> Doanh thu</button>
        </li>
        <li className={active === 'bep' ? 'active' : ''} onClick={() => setActive('bep')}>
          <button><img src={bep} alt="bep" /> Bếp</button>
        </li>
        <li>
           <button onClick={()=> handleLogout()}><img src={logout} alt="logout" /></button>
        </li>
      </ul>
    </div>
  );
};

export default Header;