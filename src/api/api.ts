import axios from "axios";

// Extend the Window interface to include the Clerk property
declare global {
  interface Window {
    Clerk?: {
      session?: {
        getToken: () => Promise<string>;
      };
    };
  }
}

const API_URL = import.meta.env.VITE_PUBLIC_URL_API;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await window.Clerk?.session?.getToken();
    console.log("Token obtenido:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error obteniendo el token:", error);
  }
  return config;
});

export default axiosInstance;
