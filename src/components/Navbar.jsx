import { useState,useEffect } from 'react';
import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { Link } from "react-router-dom";
import axios from '../config/axios'

function NavBar() {

  const { isAuth,setToken,token } = useAuth()

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/auth/user`);
        const user_data = res.data;
        setUser(user_data);
        console.log(user_data)
      } catch (error) {
        setUser(null);
        console.error('Error fetching data:', error);
      }
    };
    fetchUser()
    if (isAuth) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [isAuth,token]);

  const handleLogout = () =>{
    setToken(null)
    setUser(null)
  }

    return (
      <div className="flex bg-purple-700 py-5 text-white items-center justify-between">
        <div className="flex ml-10">
        <Link to="/content" className="text-3xl mx-10 cursor-pointer">VolleyWatch</Link>
        {user && user.role === "referee" && <Link to="/allTeams" className="text-3xl mx-20 hover:text-yellow-400 border-none cursor-pointer">
            All teams
        </Link>}

        {user && user.role === "referee" && <Link to="/addMatch" className="text-3xl mx-20 hover:text-yellow-400 border-none cursor-pointer">
            Add Match
        </Link>}
        
        </div>

        {!isAuth() ? (
        <div className="flex mr-10">
          <button className="text-3xl bg-yellow-400 rounded-full p-3 text-purple-700">Login</button>
        </div>
      ) : (
        <div className="flex mr-10 justify-center items-center">
          {user && user.login && <h2 className='mx-5 text-2xl'>{user.login}</h2>}
          
        <button
        onClick={()=>handleLogout()}
         className="text-3xl bg-yellow-400 rounded-full p-3 text-purple-700">Logout</button>
      </div>
      )}

      </div>
    );
  }
  
  export default NavBar;
  