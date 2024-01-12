export interface AuthServiceProps {
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoggedIn: boolean;
}