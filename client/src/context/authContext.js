import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (inputs) => {
    const res = await axios.post('/auth/login', inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    try {
      await axios.get('/auth/logout');
      setCurrentUser(null);
      localStorage.removeItem('user'); // Remove user data from local storage
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
