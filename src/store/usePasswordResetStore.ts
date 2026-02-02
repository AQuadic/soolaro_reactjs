import { create } from "zustand";

type ResetStep = "request" | "verify" | "reset";

interface PasswordResetState {
  // State
  email: string;
  resetToken: string | null;
  step: ResetStep;

  // Actions
  setEmail: (email: string) => void;
  setStep: (step: ResetStep) => void;
  setResetToken: (token: string | null) => void;
  clear: () => void;
}

/**
 * Password Reset Store
 *
 * This store persists the email and reset token between the forgot password,
 * OTP verification, and new password steps.
 */
export const usePasswordResetStore = create<PasswordResetState>()((set) => ({
  // Initial state
  email: "",
  resetToken: null,
  step: "request",

  // Actions
  setEmail: (email) => {
    set({ email });
  },

  setStep: (step) => {
    set({ step });
  },

  setResetToken: (resetToken) => {
    set({ resetToken });
  },

  clear: () => {
    set({
      email: "",
      resetToken: null,
      step: "request",
    });
  },
}));
