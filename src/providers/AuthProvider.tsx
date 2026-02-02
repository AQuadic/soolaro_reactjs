import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider component
 *
 * This component hydrates the user state on app mount by fetching the current
 * user data if a token exists using POST /user/user endpoint.
 * It shows a loading indicator while fetching.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { initializeAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    // Initialize auth on mount - fetches user data via POST /user/user
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Show loading spinner while hydrating auth state
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#018884]"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
