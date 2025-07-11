import axios from "axios"
import { supabase } from "./supabaseClient";
const axiosInstance = axios.create({
    baseURL :  import.meta.env.VITE_API_URL,
    timeout:10000,
    withCredentials:true,
    headers:{
        'Content-Type' : 'application/json',
    }
})
axiosInstance.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});


export default axiosInstance;