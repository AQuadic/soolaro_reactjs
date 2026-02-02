import Apple from "@/components/icons/auth/Apple";
import ClosedEye from "@/components/icons/auth/ClosedEye";
import Facebook from "@/components/icons/auth/Facebook";
import Google from "@/components/icons/auth/Google";
import Logo from "@/components/icons/header/Logo";
import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";
import { login } from "@/lib/api/auth";
import { setToken } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { getErrorMessage } from "@/lib/utils/auth";

const SignInForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Get the intended destination from location state, or default to home
  const from = (location.state as { from?: string })?.from || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.email.trim()) {
      setError(t("errors.email_required", "Email is required"));
      return;
    }
    if (!formData.password) {
      setError(t("errors.password_required", "Password is required"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      // Store token
      setToken(response.token);

      // Update auth store with user data
      setUser(response.user);

      // Navigate to intended destination
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container">
      <Link to="/" className="md:block hidden">
        <Logo />
      </Link>

      <div className="md:mt-34 mt-8">
        <MobileBackHeader title={t("sign_in_to_account")} />
        <h2 className="hidden md:block text-[#0B0B0B] text-[40px] font-semibold leading-[100%] mx-auto mb-14.5">
          {t("sign_in_to_account")}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="md:mt-14.5 mt-8">
            <label
              htmlFor="email"
              className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
            >
              {t("email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
              placeholder={t("enter_email")}
              disabled={isLoading}
            />
          </div>

          <div className="mt-8 relative">
            <label
              htmlFor="password"
              className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
            >
              {t("password")}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
              placeholder={t("enter_password")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-13 ltr:right-4 rtl:left-4 cursor-pointer"
            >
              {showPassword ? <Eye /> : <ClosedEye />}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <p className="text-[#0B0B0B] md:text-base text-xs font-medium leading-[100%]">
                {t("remember_me")}
              </p>
            </div>
            <Link
              to="/forget_password"
              className="text-[#018884] md:text-base text-xs font-bold leading-[100%]"
            >
              {t("forget_password")}
            </Link>
          </div>

          {/* Social Login - Hidden for now */}
          {/* <div className="mt-10 flex items-center gap-2">
            <div className="w-full h-px bg-[#DEDDDD]"></div>
            <p className="text-[#3B3B3B] md:text-sm text-[10px] font-medium">
              {t("or")}
            </p>
            <div className="w-full h-px bg-[#DEDDDD]"></div>
          </div>

          <div className="flex items-center justify-center gap-8 md:mt-8 mt-4">
            <Facebook />
            <Google />
            <Apple />
          </div> */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              t("sign_in")
            )}
          </button>
        </form>

        <div className="md:mt-4 mt-3 flex items-center justify-center">
          <p className="text-[#0B0B0B] md:text-base text-xs font-medium">
            {t("dont_have_account")}{" "}
            <Link
              to="/signup"
              className="text-[#018884] md:text-lg text-base font-bold"
            >
              {t("sign_up")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
