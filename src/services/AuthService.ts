import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { getApiClient } from "./api/api.ts";
import { Components } from "./api/openapi";
import { useState } from "react";

export function useAuthService(): AuthServiceProps {
  const [loggedInUser, setLoggedInUser] =
    useState<Components.Schemas.UserSchema | null>(null);

  const getUserDetails = async () => {
    const username = localStorage.getItem("username");
    const apiClient = await getApiClient();
    const axiosResponse = await apiClient.accounts_api_get_user_by_username({
      username: username ?? "",
    });

    const userData = axiosResponse.data;
    setLoggedInUser(userData);
    localStorage.setItem("user_name", userData.first_name ?? "N/A");
  };

  const getInitialLoggedInValue = () => {
    const loggedInStorage = localStorage.getItem("isLoggedIn");
    const loggedIn = loggedInStorage !== null && loggedInStorage === "true";

    if (loggedIn) {
      void getUserDetails();
    }

    return loggedIn;
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    getInitialLoggedInValue,
  );

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/token/`,
        {
          username,
          password,
        },
      );
      const { access, refresh }: { access: string; refresh: string } =
        response.data;

      localStorage.setItem("jwt_token", access);
      localStorage.setItem("jwt_refreshToken", refresh);
      localStorage.setItem("username", username);

      await getUserDetails();

      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      return true;
    } catch (e) {
      setIsLoggedIn(false);
      setLoggedInUser(null);
      localStorage.setItem("isLoggedIn", "false");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("jwt_refreshToken");
    localStorage.removeItem("username");
    localStorage.setItem("isLoggedIn", "false");
    setLoggedInUser(null);
    setIsLoggedIn(false);
  };

  return { login, logout, isLoggedIn, loggedInUser };
}
