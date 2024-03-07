import { Components } from "../services/api/openapi";

export interface AuthServiceProps {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
  loggedInUser: Components.Schemas.UserSchema | null;
}
