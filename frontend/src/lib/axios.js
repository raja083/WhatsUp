import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: "https://whatsup-2l8r.onrender.com/api",
  withCredentials: true,
});