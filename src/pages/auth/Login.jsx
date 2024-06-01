import { React, useState } from "react";
import axios from "../../config/axios";
import { useAuth } from "../../providers/AuthProvider";

function Login() {
  const { setToken } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", {
        username: username,
        password: password,
      });
      const newToken = response.data.token;
      setToken(newToken);
      setError("");
      //window.location.reload();
    } catch (error) {
      setError("Incorrect username or password!");
    }
  };
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col bg-purple-600 my-20 w-96 p-6 rounded-lg shadow-md">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">
          Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          className="mb-4 p-2 rounded bg-white text-black"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 rounded bg-white text-black"
          value={password}
          onChange={handlePasswordChange}
        />
        <h2 className="text-xl text-white flex justify-center my-5">{error}</h2>
        <button
          onClick={handleLogin}
          className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
