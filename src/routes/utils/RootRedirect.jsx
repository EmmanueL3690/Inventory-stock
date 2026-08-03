import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import Home from "../../components/Public/Pages/Home";

const RootRedirect = () => {
  const { token, loading } = useAuth();

  if (loading) return null;

  // Logged in → Dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Not logged in → Landing Page
  return <Home />;
};

export default RootRedirect;