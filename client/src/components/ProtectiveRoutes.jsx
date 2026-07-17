import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { getAuthToken } from "../utils/authToken";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useCurrentUser();
  const hasToken = !!getAuthToken();

  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
