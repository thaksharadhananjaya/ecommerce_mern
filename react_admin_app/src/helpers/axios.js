import { API_URL } from "../constant";
import axios from 'axios';

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create(
    {
        baseURL: API_URL,
        headers: token ? {
            'authorization': `Bearer ${token}`
        }:'',
    },

);

export default axiosInstance;