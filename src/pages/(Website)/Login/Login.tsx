import React, { useState } from 'react';
import './Login.css';

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
    <div className="app-container">
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login to Your Account</h2>
            <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                value={email}
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label>Password</label>
            <input
                type="password"
                value={password}
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <div className="form-options">
            
            <a href="register" className="forgot-password">Sign up</a>
            <a href="forgotpassword" className="forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="login-button">Log In</button>
        </form>
        </div>
    </div>
  );
};

export default Login;