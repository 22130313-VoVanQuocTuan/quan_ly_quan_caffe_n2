import React, { useEffect, useState } from 'react'
import './header.css'
import { menu, order, stock,  staff, doanhthu, bep, logout, home } from '../../assets/icons';
import {  useLocation, useNavigate } from "react-router-dom";
import { logoutAuth } from '../../service/authApi';


const Header = () => {
  const [active, setActive] = useState('home');
  const navigate = useNavigate();
 const location = useLocation();
    // Đồng bộ state active với URL hiện tại
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActive('home');
    else if (path === '/menu') setActive('menu');
    else if (path === '/order') setActive('order');
    else if (path === '/stock') setActive('stock');
    else if (path === '/staff') setActive('staff');
    else if (path === '/doanhthu') setActive('doanhthu');
    else if (path === '/bep') setActive('bep');
  }, [location]);


  
  const handleLogout = () => {
    // Ví dụ: xóa token ở đây
    logoutAuth();
    navigate("/login"); // ;Chuyển trang
  };
  return (
    <div className="header">
    
      <ul className="head">
          <li className={active === 'home' ? 'active' : ''} onClick={() => {setActive('home'); navigate('/');}}>
          <button><img src={home} alt="home" /> Home</button>
        </li>
      <li className={active === 'menu' ? 'active' : ''} onClick={() => { setActive('menu'); navigate('/menu'); }}>
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