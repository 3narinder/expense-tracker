import { useCurrentUser } from "../features/Authentication/useCurrentUser.js";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useCurrentUser();

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
