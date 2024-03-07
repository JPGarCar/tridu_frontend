import { ApiServiceProps } from "../../@types/api-service";
import { Client } from "./openapi";
import axios, { AxiosError } from "axios";
import { OpenAPIClientAxios } from "openapi-client-axios";
import { AuthServiceProps } from "../../@types/auth-service";
import { getErrorObjectSchema } from "./apiError.ts";

import definition from "./../../assets/openapi-runtime.json";
import { ProviderContext } from "notistack";

const api = new OpenAPIClientAxios({
  definition: definition,
  withServer: {
    url: `${import.meta.env.VITE_API_URL}`,
  },
});

export function useApiService(
  authService: AuthServiceProps,
  snackBarService: ProviderContext,
): ApiServiceProps {
  const getApiClient = async (): Promise<Client> => {
    const client = await api.getClient<Client>();

    // thanks https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app

    client.interceptors.request.clear();

    // add auth token
    client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    client.interceptors.response.clear();

    // refresh token if error is 401
    client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (originalRequest == undefined) {
          return Promise.reject(error);
        }

        if (
          error.response != undefined &&
          error.response.status === 401 &&
          // @ts-expect-error we expect an error
          !originalRequest._retry
        ) {
          try {
            // @ts-expect-error we expect an error
            originalRequest._retry = true;
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

            authService.logout();
            snackBarService.enqueueSnackbar("You must log in again!", {
              variant: "warning",
            });
          } catch (error) {
            authService.logout();
            snackBarService.enqueueSnackbar("You must log in again!", {
              variant: "warning",
            });
          }
        } else if (
          error.response != undefined &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          const errorObjectSchema = getErrorObjectSchema(error.response.data);
          if (errorObjectSchema != null) {
            snackBarService.enqueueSnackbar(
              errorObjectSchema.title + ": " + errorObjectSchema.details,
              { variant: "warning", autoHideDuration: 8000 },
            );
          } else {
            snackBarService.enqueueSnackbar(error.message, {
              variant: "warning",
              autoHideDuration: 10000,
            });
          }
        } else if (
          error.response != undefined &&
          error.response.status >= 500
        ) {
          snackBarService.enqueueSnackbar(
            "Critical error, please contact admin ASAP! Details: " +
              error.message,
            { variant: "warning", autoHideDuration: 12000 },
          );
        }

        return Promise.reject(error);
      },
    );

    return client;
  };

  return { getApiClient };
}
