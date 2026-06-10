import { Navigate } from "react-router";

function OnboardingRoute({
  children,
  authUser,
}) {
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (authUser.isOnboarded) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default OnboardingRoute;