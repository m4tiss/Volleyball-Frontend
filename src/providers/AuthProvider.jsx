import { React, createContext, useState, useContext, useEffect } from "react";
import axios from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenKey = "authToken";
  const [token, setToken] = useState(localStorage.getItem(tokenKey) || null);
  const [finishHeader, setFinishHeader] = useState(false);
  const [isReferee, setIsReferee] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem(tokenKey, token);
      setFinishHeader(true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(tokenKey);
    }
  }, [token]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (finishHeader) {
        try {
          const res = await axios.get(`/auth/user`);
          const user_data = res.data;
          setUser(res.data)
          if (user_data.role === "referee") {
            setIsReferee(true);
          } else {
            setIsReferee(false);
          }
        } catch (error) {
          setIsReferee(false);
          setUser(null);
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchUserRole();
  }, [token, finishHeader]);

  const isAuth = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider value={{ token, setToken, isAuth, finishHeader,
     isReferee,user,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
