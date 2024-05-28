import React from 'react';
import { useAuth } from '../../providers/AuthProvider'

function Login() {

    const { setToken } = useAuth();

    const handleChange = () => {
        setToken("nowy token");
      };

    return (
      <div className="flex w-full justify-center">
        <div className="flex flex-col bg-purple-600 my-20 w-96 p-6 rounded-lg shadow-md">
            <h2 className="text-white text-2xl font-bold mb-4 text-center">Login</h2>
            <input 
                type="text" 
                placeholder="Username" 
                className="mb-4 p-2 rounded bg-white text-black"
            />
            <input 
                type="password" 
                placeholder="Password" 
                className="mb-4 p-2 rounded bg-white text-black"
            />
            <button
            onClick={handleChange} 
                className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
            >
                Login
            </button>
        </div>

      </div>
    );
  }
  
  export default Login;
  