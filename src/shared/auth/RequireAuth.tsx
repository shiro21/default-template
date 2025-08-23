import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";



const RequireAuth = ({ redirectTo = '/login' }: { redirectTo?: string }) => {
    
    const { accessToken } = useAuthStore();
    const location = useLocation();

    if (!accessToken) return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
    
    return <Outlet />
}

export default RequireAuth;