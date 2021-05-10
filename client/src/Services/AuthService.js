import axios from "axios";
import { getToken } from "../util";

export const userAxios = axios.create();

// interceptor to attach token on request
userAxios.interceptors.request.use(
  (request) => {
    let token = getToken("token");
    if (request.url.includes("user") || request.url.includes("post")) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const Login = (user) => {
  return userAxios
    .post("/login", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const Register = (user) => {
  return userAxios
    .post("/signup", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const IsAuthenticated = () => {
  return userAxios
    .get("/user/profile")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
