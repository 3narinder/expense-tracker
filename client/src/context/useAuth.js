import { useContext } from "react";
import AuthContext from "./AuthContext.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);

  // Safety check: Throws a clear error if used outside of <AuthProvider>
  if (context === undefined || context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
