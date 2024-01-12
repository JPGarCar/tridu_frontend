import { Navigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext.tsx";

const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
    const { isLoggedIn } = useAuthServiceContext();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;