import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    
    if (!formData.email) {
      tempErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email không hợp lệ';
    }

    if (!formData.username) {
      tempErrors.username = 'Username không được để trống';
    } else if (formData.username.length < 5 || formData.username.length > 10) {
      tempErrors.username = 'Username phải từ 5 đến 10 ký tự';
    }

    if (!formData.password) {
      tempErrors.password = 'Password không được để trống';
    } else if (formData.password.length < 5 || formData.password.length > 10) {
      tempErrors.password = 'Password phải từ 5 đến 10 ký tự';
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Confirm password không được để trống';
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    if (!formData.role) {
      tempErrors.confirmPassword = 'Vui lòng chọn vị trí';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = await registerUser(formData);
      navigate('/login');
      alert("Đăng ký thành công!");
    } catch (error) {
      console.error("Lỗi đăng ký:", error.response?.data || error.message);
      alert("Đăng ký thất bại!");
    }
  };

  const gotoLogin = () => {
    navigate('/login');
  }

  return (
    <div className="auth-container">
      <h2>Đăng Ký - Quản Lý Quán Cà Phê</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group role">
          <label>Vị trí:</label>
          <label className='vitri'>
            <input
              type="radio"
              name="role"
              value="Phục vụ"
              onChange={handleChange}
              checked={formData.role === "Phục vụ"}
            /> Phục vụ
          </label>
          <label className='vitri'>
            <input
              type="radio"
              name="role"
              value="Thu ngân"
              checked={formData.role === "Thu ngân"}
              onChange={handleChange}
            /> Thu ngân
          </label>
          <label className='vitri'>
            <input
              type="radio"
              name="role"
              value="Bếp"
              checked={formData.role === "Bếp"}
              onChange={handleChange}
            /> Bếp
          </label>
          <label className='vitri'>
            <input
              type="radio"
              name="role"
              value="Chủ"
              checked={formData.role === "Chủ"}
              onChange={handleChange}
            /> Chủ
          </label>
          <label className='vitri'>
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={formData.role === "Admin"}
              onChange={handleChange}
            /> Admin
          </label>
        </div>

        <button type="submit" className="submit-btn">Đăng Ký</button>
      </form>
      <button type='button' onClick={gotoLogin}>Đăng nhập</button>
    </div>
  );
};

export default Register;
