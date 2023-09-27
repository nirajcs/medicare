import axios from 'axios';
import Cookies from 'js-cookie';

// Create Axios instances
export const usersApi = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

export const adminApi = axios.create({
  baseURL: 'http://localhost:5000/api/admin',
});

export const doctorApi = axios.create({
  baseURL: 'http://localhost:5000/api/doctors',
});

// Define a function to handle token expiration and redirection
const handleTokenExpiration = (instance, tokenKey, redirectPath) => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401 && error?.response?.data?.message === 'jwt expired') {
        Cookies.remove(tokenKey);
        window.location.replace(redirectPath);
      }
      return Promise.reject(error);
    }
  );
};

// Set up interceptors for each instance
handleTokenExpiration(usersApi, 'jwt', '/');
handleTokenExpiration(adminApi, 'admnjwt', '/admin');
handleTokenExpiration(doctorApi, 'docjwt', '/doctor');
