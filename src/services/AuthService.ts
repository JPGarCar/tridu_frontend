import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import {getApiClient} from "./api/api.ts";
import {Components} from "./api/openapi";
import {useState} from "react";



export function useAuthService(): AuthServiceProps {

    const getInitialLoggedInValue = () => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        return loggedIn !== null && loggedIn === "true";
    }

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>((getInitialLoggedInValue));

    const getUserDetails = async () => {
        const username = localStorage.getItem("username");
        const apiClient = await getApiClient();
        const axiosResponse = await apiClient.accounts_api_get_user_by_username({username: username ?? ""});

        const userData =  (axiosResponse.data as Components.Schemas.UserSchema);

        localStorage.setItem("user_name", userData.first_name ?? "N/A")
    }

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/token/",
                {
                    username,
                    password,
                }
            );
            const { access, refresh }: {access: string, refresh: string} = response.data;

            localStorage.setItem("jwt_token", access);
            localStorage.setItem("jwt_refreshToken", refresh);
            localStorage.setItem("username", username);

            await getUserDetails();

            setIsLoggedIn(true);
            return true;
        } catch (e) {
            setIsLoggedIn(false);
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("jwt_refreshToken");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
    }

    return { login, logout, isLoggedIn };
}