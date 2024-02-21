import { ApiServiceProps } from "../../@types/api-service";
import { Client, Components } from "./openapi";
import axios, { AxiosError } from "axios";
import { OpenAPIClientAxios } from "openapi-client-axios";
import { SnackbarServiceProps } from "../../@types/snackbar_service";
import { AuthServiceProps } from "../../@types/auth-service";

export function useApiService(
  authService: AuthServiceProps,
  snackBarService: SnackbarServiceProps,
): ApiServiceProps {
  const api = new OpenAPIClientAxios({
    definition: `${import.meta.env.VITE_API_URL}/api/openapi.json`,
    withServer: {
      url: `${import.meta.env.VITE_API_URL}`,
    },
  });
  const getApiClient = async (): Promise<Client> => {
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
      (error: AxiosError) => Promise.reject(error),
    );

    // refresh token if error is 401
    client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (originalRequest == undefined) {
          return Promise.reject(error);
        }

        if (error.response != undefined && error.response.status === 401) {
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

            authService.logout();
            snackBarService.pushAlert("You must log in again!", "warning");
          } catch (error) {
            authService.logout();
            snackBarService.pushAlert("You must log in again!", "warning");
          }
        }

        if (
          error.response != undefined &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          const jsonError: Components.Schemas.ErrorObjectSchema =
            error.response.data;

          snackBarService.pushAlert(
            jsonError.title + ": " + jsonError.details,
            "warning",
          );
        } else if (
          error.response != undefined &&
          error.response.status >= 500
        ) {
          snackBarService.pushAlert(
            "Critical error, please contact admin ASAP! Details: " +
              error.message,
            "error",
          );
        }

        return Promise.reject(error);
      },
    );

    return client;
  };

  return { getApiClient };
}
