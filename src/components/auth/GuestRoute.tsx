import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface GuestRouteProps {
  children: React.ReactNode;
}

/**
 * GuestRoute component
 *
 * Guards routes that should only be accessible to unauthenticated users
 * (e.g., signin, signup, forgot password). If the user is already
 * authenticated, they will be redirected to the home page.
 */
export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated()) {
    // Redirect authenticated users to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
