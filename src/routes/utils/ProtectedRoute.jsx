import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const ProtectedRoute = () => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;