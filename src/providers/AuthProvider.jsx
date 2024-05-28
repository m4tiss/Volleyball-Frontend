import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../config/axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const tokenKey = "authToken";
    const [token, setToken] = useState(localStorage.getItem(tokenKey) || null);


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);


  const isAuth = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;