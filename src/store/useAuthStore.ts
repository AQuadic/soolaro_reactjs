import { create } from "zustand";
import {
  logout as logoutApi,
  getCurrentUser,
  type User,
} from "../lib/api/auth";
import { axios, getToken, removeToken } from "../lib/axios";
import { deleteFcmToken } from "../lib/firebase";

interface AuthState {
  // State
  user: User | null;
  error: string | null;
  isInitialized: boolean;
  isLoggingOut: boolean;

  // Computed (based on token and user)
  isAuthenticated: () => boolean;

  // Actions
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  logout: () => Promise<void>;
  clearError: () => void;
  refetchUser: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

/**
 * Auth store (Zustand)
 *
 * NOTE: This store intentionally does NOT persist the `user` object.
 * The authentication token is stored in cookies (managed by axios.ts).
 * The app will fetch fresh user data on each page refresh via `AuthProvider`
 * which calls `getCurrentUser()` (POST /user/user) if a token exists in cookies.
 */
export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  user: null,
  error: null,
  isInitialized: false,
  isLoggingOut: false,

  // Check if authenticated based on both token AND user data
  isAuthenticated: () => {
    const token = getToken();
    const { user } = get();
    return !!(token && user);
  },

  // Actions
  setUser: (user) => {
    set({ user });
  },

  setError: (error) => {
    set({ error });
  },

  setInitialized: (initialized) => {
    set({ isInitialized: initialized });
  },

  clearError: () => {
    set({ error: null });
  },

  /**
   * Refetch user data from the API
   */
  refetchUser: async () => {
    const token = getToken();
    if (!token) return;

    try {
      const user = await getCurrentUser();
      set({ user });
    } catch {
      // Silent fail - user stays as is
    }
  },

  /**
   * Initialize auth on app mount - fetches user data if token exists
   */
  initializeAuth: async () => {
    const token = getToken();

    if (!token) {
      set({ user: null, isInitialized: true });
      return;
    }

    try {
      const user = await getCurrentUser();
      set({ user, isInitialized: true });
    } catch (error) {
      // Token is invalid or expired
      console.error("Failed to initialize auth:", error);
      removeToken();
      set({ user: null, isInitialized: true });
    }
  },

  /**
   * Logout the current user
   */
  logout: async () => {
    if (get().isLoggingOut) return;
    set({ isLoggingOut: true });

    const token = getToken();

    // Attempt server-side logout only if we have a token
    if (token) {
      try {
        await logoutApi();
      } catch {
        // ignore - best-effort
      }
    }

    // Remove stored auth token from cookies
    try {
      removeToken();
    } catch {
      // ignore
    }

    // Try to remove FCM token and any local markers
    try {
      // fire-and-forget
      deleteFcmToken();
    } catch {
      // ignore
    }

    delete axios.defaults.headers.common["Authorization"];
    set({ user: null, error: null, isLoggingOut: false });
  },
}));
