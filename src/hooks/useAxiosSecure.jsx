import axios from "axios";
import { useEffect } from "react";
import useAuthValue from "./useAuthValue";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://job-er-mare-salam-server.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logOut } = useAuthValue();
  const nav = useNavigate();
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 403 || error.status === 401) {
          logOut().then(() => {
            nav("/signIn");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logOut, nav]);

  return axiosInstance;
};

export default useAxiosSecure;
