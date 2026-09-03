import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, fallback = null }) => {
  const { user, isAuthPending } = useCurrentUser();

  if (isAuthPending) {
    return fallback;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const PublicRoute = ({ children, fallback = null }) => {
  const { user, isAuthPending } = useCurrentUser();

  if (isAuthPending) {
    return fallback;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
