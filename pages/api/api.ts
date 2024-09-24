import axios from 'axios';
import {getAuth} from "firebase/auth";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use(
    async (config) => {
        const user = getAuth().currentUser;

        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("requestConfig: ", config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
      console.error("API Error", error);
      return Promise.reject(error);
    }
);

export default api;

