// routes/utils/AuthRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const AuthRoute = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ✅ If already logged in → block login page
  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;