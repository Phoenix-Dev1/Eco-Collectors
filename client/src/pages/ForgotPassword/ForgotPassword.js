import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/forgotPassword', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to reset password. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
