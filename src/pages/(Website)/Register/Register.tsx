import React, { useState } from 'react';
import Style from './Register.module.scss';
import { footer } from '@/assets/img';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false); // Trạng thái cho checkbox
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Agreed to Terms:', agreed);
  };

  return (
    <div className={Style.container}>
      <div className={Style.logo}>
        <img src="your-logo-url-here" alt="Logo" />
      </div>

      <div className={Style.leftSide}>
        <img src={footer} alt="Register illustration" />
      </div>

      <div className={Style.rightSide}>
        <div className={Style.registerContainer}>
          <h2 className={Style.registerTitle}>Create New Account</h2>
          <p className={Style.registerSubtitle}>Please enter details</p> {/* Dòng chữ mới */}
          <form className={Style.registerForm} onSubmit={handleSubmit}>
          <div className={Style.formGroup}>
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                placeholder='First Name'
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={Style.formGroup}>
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                placeholder='Last Name'
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className={Style.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                placeholder='Email Address'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={Style.formGroup}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={Style.termsContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                I agree to the <strong><a href="/terms">Terms</a></strong> & <strong><a href="/conditions">Conditions</a></strong>
              </label>
            </div>
            <button type="submit" className={Style.registerButton}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
