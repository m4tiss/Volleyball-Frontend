import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../config/axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const tokenKey = "authToken";
    const [token, setToken] = useState(localStorage.getItem(tokenKey) || null);


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem(tokenKey,token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(tokenKey)
    }
    console.log("Token:" + token)
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within a UserProvider');
    }
    return context;
  };