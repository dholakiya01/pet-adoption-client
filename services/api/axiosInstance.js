import axios from "axios";
import { setupAuthInterceptor } from "./authInterceptor";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
});

setupAuthInterceptor(axiosInstance);

export default axiosInstance;
