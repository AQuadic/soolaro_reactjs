import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { socialLogin } from "@/lib/api/auth";
import { setToken } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Google from "@/components/icons/auth/Google";
import { getErrorMessage } from "@/lib/utils/auth";
import { Loader2 } from "lucide-react";

const SocialLogin = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // Get the intended destination from location state, or default to home
  const from = (location.state as { from?: string })?.from || "/";

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Get Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (!token) {
        throw new Error("No access token returned from Google");
      }

      // Send token to API for authentication
      const response = await socialLogin({
        provider: "google",
        access_token: token,
      });

      const authedUser = response.user;

      if (authedUser) {
        // Store token
        setToken(response.token);
        // Update auth store with user data
        setUser(authedUser);
        // Navigate to intended destination
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-6">
      {/* Divider */}
      <div className="flex items-center gap-2">
        <div className="w-full h-px bg-[#DEDDDD]"></div>
        <p className="text-[#3B3B3B] md:text-sm text-[10px] font-medium whitespace-nowrap">
          {t("or", "or")}
        </p>
        <div className="w-full h-px bg-[#DEDDDD]"></div>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="cursor-pointer w-full h-14 flex items-center justify-center gap-3 bg-white border border-[#DEDDDD] rounded-4xl hover:bg-gray-50 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Google />
            <span className="text-[#0B0B0B] text-base font-medium">
              {t("continue_with_google", "Continue with Google")}
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default SocialLogin;
