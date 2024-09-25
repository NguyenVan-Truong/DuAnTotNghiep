import React, { useState } from 'react';
import './forgot.scss';
import { footer } from '@/assets/img';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Xử lý gửi yêu cầu quên mật khẩu ở đây
    console.log('Đã gửi yêu cầu đến email:', email);
  };

  return (
    <div className="forgot-password-page">
  {/* Logo ở góc trái trên */}
  <div className="logo">
    <img src="your-logo-url-here" alt="Logo" />
  </div>

  {/* Bên trái với ảnh minh họa */}
  <div className="left-side">
    <img src={footer} alt="Illustration" />
  </div>

  {/* Bên phải với form forgot password */}
  <div className="right-side">
    <div className="forgot-password-container">
      <h2 className="form-title">
        Forgot Your Password?
      </h2>
      <p className="form-subtitle">Please enter your email address below, and we will send you a link to reset your password.</p>

      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Send Reset Link</button>
      </form>
    </div>
  </div>
</div>

  );
};

export default ForgotPassword;
