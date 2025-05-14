import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/authApi';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
     const data = await login(formData)
     navigate('/')
    }catch (error) {
      console.error("Lỗi đăng nhập:", error.response?.data || error.message);
      alert("Đăng nhập thất bại!");
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="auth-container">
      <h2>Đăng Nhập - Quản Lý Quán Cà Phê</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group role">
          <label>Vị trí:</label>
          <label className="vitri">
            <input
              type="radio"
              name="role"
              value="Phục vụ"
              checked={formData.role === "Phục vụ"}
              onChange={handleChange}
            />
            Phục vụ
          </label>

          <label className="vitri">
            <input
              type="radio"
              name="role"
              value="Thu ngân"
              checked={formData.role === "Thu ngân"}
              onChange={handleChange}
            />
            Thu ngân
          </label>

          <label className="vitri">
            <input
              type="radio"
              name="role"
              value="Bếp"
              checked={formData.role === "Bếp"}
              onChange={handleChange}
            />
            Bếp
          </label>

          <label className="vitri">
            <input
              type="radio"
              name="role"
              value="Chủ"
              checked={formData.role === "Chủ"}
              onChange={handleChange}
            />
            Chủ
          </label>

          <label className="vitri">
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={formData.role === "Admin"}
              onChange={handleChange}
            />
            Admin
          </label>
        </div>

        <button type="submit" className="submit-btn">Đăng Nhập</button>
      </form>
      <button type="button" onClick={goToRegister}>Đăng Ký</button>
    </div>
  );
};

export default Login;