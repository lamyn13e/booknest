import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = chưa đăng nhập

  useEffect(() => {
    axios.get('http://localhost:8081/api/current-user', {
      withCredentials: true,
    })
      .then(res => setUser(res.data))
      .catch(() => setUser(null)); // không cần hiển thị lỗi
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
