import React, { useState } from 'react';
import './Login.scss';
import { footer } from '@/assets/img';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Thực hiện xử lý đăng nhập ở đây
  };

  return (
    <div className="login-page">
        <div className="logo">
            <img src="" alt="Logo" />
        </div>
      <div className="left-side">
        <img src={footer} alt="Login illustration" />
      </div>
      <div className="right-side">
        <div className="login-container">
          <h2 className="login-title">
            Welcome   <span className="wave-hand">👋</span> 
          </h2>
          <p className="login-subtitle">Please login here</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <a href="/forgotpassword" className="forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="login-button">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;