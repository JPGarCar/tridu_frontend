import { OpenAPIClientAxios } from "openapi-client-axios";
import type { Client } from "./openapi";
import axios from "axios";

const api = new OpenAPIClientAxios({
  definition: `${import.meta.env.VITE_API_URL}/api/openapi.json`,
  withServer: {
    url: `${import.meta.env.VITE_API_URL}`,
  },
});

export const getApiClient = async (): Promise<Client> => {
  const client = await api.getClient<Client>();

  // thanks https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app

  // add auth token
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwt_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // refresh token if error is 401
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response != undefined &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("jwt_refreshToken");
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
            { refresh: refreshToken },
          );
          const { access } = response.data;

          if (access != null && typeof access === "string") {
            localStorage.setItem("jwt_token", access);
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return axios(originalRequest);
          }

          return Promise.reject(error);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};
