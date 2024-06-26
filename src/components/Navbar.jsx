import { useState,useEffect } from 'react';
import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { Link } from "react-router-dom";
import axios from '../config/axios'

function NavBar() {

  const { isAuth,setToken,isReferee,user,setUser } = useAuth()



  const handleLogout = () =>{
    setToken(null)
    setUser(null)
  }

    return (
      <div className="flex bg-purple-700 py-5 text-white items-center justify-between">
        <div className="flex ml-10">
        <Link to="/content" className="text-3xl mx-10 cursor-pointer">VolleyWatch</Link>
        {isReferee && <Link to="/allTeams" className="text-3xl mx-20 hover:text-yellow-400 border-none cursor-pointer">
            All teams
        </Link>}

        {isReferee && <Link to="/addMatch" className="text-3xl mx-20 hover:text-yellow-400 border-none cursor-pointer">
            Add Match
        </Link>}

        {isReferee && <Link to="/settings" className="text-3xl mx-20 hover:text-yellow-400 border-none cursor-pointer">
            Settings
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
  