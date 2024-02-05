import {Navigate, Outlet} from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext.tsx";

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuthServiceContext();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Outlet />
        </>
    );
}

export default ProtectedRoute;