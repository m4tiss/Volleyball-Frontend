import React from 'react';
import { useAuth } from '../providers/AuthProvider';

function NavBar() {

  const { isAuth,setToken } = useAuth()

    return (
      <div className="flex bg-purple-700 py-5 text-white items-center justify-between">
        <div className="flex ml-10">
        <h2 className="text-3xl mx-10 select-none">VolleyWatch</h2>
        <h2 className="text-3xl mx-20 hover:text-yellow-400 border-none cursor-pointer">All teams</h2>
        </div>

        {!isAuth() ? (
        <div className="flex mr-10">
          <button className="text-3xl bg-yellow-400 rounded-full p-3 text-purple-700">Login</button>
        </div>
      ) : (
        <div className="flex mr-10">
        <button
        onClick={()=>setToken(null)}
         className="text-3xl bg-yellow-400 rounded-full p-3 text-purple-700">Logout</button>
      </div>
      )}

      </div>
    );
  }
  
  export default NavBar;
  