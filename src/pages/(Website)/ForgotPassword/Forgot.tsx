import React, { useState } from 'react';
import './forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Xử lý gửi yêu cầu quên mật khẩu ở đây
    console.log('Đã gửi yêu cầu đến email:', email);
  };

  return (
    <div className="app-container">
      <div className="forgot-password-container">
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Forgot Your Password?</h2>
          <div className='p'><p>Please enter your email address below, and we will send you a link to reset your password.</p></div>
          <div className="form-group">
            <label>Email</label>
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
  );
};

export default ForgotPassword;
