import { Navigate } from "react-router";

function ProtectedRoute({
  children,
  authUser,
}) {
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (!authUser.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

export default ProtectedRoute;