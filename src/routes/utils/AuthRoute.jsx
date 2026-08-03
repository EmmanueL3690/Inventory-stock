import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const AuthRoute = () => {
  const { token, business, loading } = useAuth();

  // 1. Defer rendering while state initializes to eliminate flickering
  if (loading) {
    return null;
  }

  // 2. If authenticated, route away from public entry gates to the correct workspace
  if (token) {
    return business?.onboardingCompleted === true ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/onboarding" replace />
    );
  }

  // 3. Unauthenticated state: grant access to public auth options
  return <Outlet />;
};

export default AuthRoute;