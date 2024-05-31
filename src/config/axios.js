import axios from "axios";
const instance = axios.create({
  baseURL: process.env.API_URL || "https://volleyball-backend.onrender.com/",
});

export default instance;