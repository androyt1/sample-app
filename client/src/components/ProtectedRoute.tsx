import { useAppSelector } from "@/store/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { token } = useAppSelector((state) => state.auth);
    return token ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
