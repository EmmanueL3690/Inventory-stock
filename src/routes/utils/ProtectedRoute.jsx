import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const ProtectedRoute = () => {
  const { token, loading } = useAuth();
  const location = useLocation();

  // 1. Defer rendering while AuthContext initializes the session state
  if (loading) {
    return null;
  }

  // 2. Unauthenticated state: Force redirection to login page
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // 3. Authenticated state: Allow entry to nested layouts
  return <Outlet />;
};

export default ProtectedRoute;