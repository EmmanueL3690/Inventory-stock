import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function OnboardingGuard() {
  const { token, business, loading } = useAuth();
  const location = useLocation();

  // 1. Defer rendering while AuthContext initializes session state
  if (loading) {
    return null;
  }

  // 2. Unauthenticated: Redirect immediately to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isOnboardingPage = location.pathname === "/onboarding";

  // 3. Onboarding Incomplete: Only allow access to the /onboarding route
  if (!business?.onboardingCompleted) {
    return isOnboardingPage ? <Outlet /> : <Navigate to="/onboarding" replace />;
  }

  // 4. Onboarding Complete: Block access to /onboarding, routing to dashboard instead
  if (isOnboardingPage) {
    return <Navigate to="/" replace />;
  }

  // 5. Normal Authenticated & Onboarded State: Render child route layout pipeline
  return <Outlet />;
}