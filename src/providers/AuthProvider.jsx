import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../config/axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const tokenKey = "authToken";
    const [token, setToken] = useState(localStorage.getItem(tokenKey) || null);
    const [finishHeader,setFinishHeader] = useState(false)


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("auth")
      localStorage.setItem(tokenKey,token);
      setFinishHeader(true)
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(tokenKey)
    }
  }, [token]);


  const isAuth = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, isAuth,finishHeader }}
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