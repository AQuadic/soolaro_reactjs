import { useEffect, useState } from "react";
import { getToken } from "@/lib/axios";
import { getCurrentUser } from "@/lib/api/auth";
import { useAuthStore } from "@/store/useAuthStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider component
 *
 * This component hydrates the user state on app mount by fetching the current
 * user data if a token exists. It shows a loading indicator while fetching.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hydrateUser = async () => {
      const token = getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { user } = await getCurrentUser();
        setUser(user);
      } catch {
        // Token is invalid, user will be logged out via axios interceptor
        // or we simply don't set the user
      } finally {
        setIsLoading(false);
      }
    };

    hydrateUser();
  }, [setUser]);

  // Show loading spinner while hydrating auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#018884]"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
