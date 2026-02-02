import ClosedEye from "@/components/icons/auth/ClosedEye";
import Logo from "@/components/icons/header/Logo";
import { Eye, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";
import { resetPassword } from "@/lib/api/auth";
import { usePasswordResetStore } from "@/store/usePasswordResetStore";
import { getErrorMessage } from "@/lib/utils/auth";

const NewPasswordForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { email, resetToken, clear } = usePasswordResetStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  // Redirect if no email in store (user came directly to this page)
  useEffect(() => {
    if (!email) {
      navigate("/forget_password", { replace: true });
    }
  }, [email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.password) {
      setError(t("errors.password_required", "Password is required"));
      return;
    }
    if (formData.password.length < 6) {
      setError(
        t(
          "errors.password_min_length",
          "Password must be at least 6 characters",
        ),
      );
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setError(t("errors.passwords_do_not_match", "Passwords do not match"));
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({
        email,
        token: resetToken || "",
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      // Clear password reset store
      clear();

      // Navigate to signin page
      navigate("/signin", { replace: true });
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
        <MobileBackHeader />
        <h2 className="text-[#0B0B0B] md:text-[40px] text-2xl font-bold md:font-semibold leading-[100%] text-center mx-auto mt-6">
          {t("creating_new_password")}
        </h2>
        <p className="text-[#3B3B3B] text-base font-medium leading-[150%] mt-6 text-center">
          {t("enter_new_password_instruction")}
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="md:mt-14.5 mt-8 relative">
            <label
              htmlFor="password"
              className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
            >
              {t("new_password")}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
              placeholder={t("enter_your_password")}
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

          <div className="mt-6 relative">
            <label
              htmlFor="confirm_password"
              className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
            >
              {t("confirm_new_password")}
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={formData.password_confirmation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  password_confirmation: e.target.value,
                }))
              }
              className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
              placeholder={t("enter_your_password")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-13 ltr:right-4 rtl:left-4 cursor-pointer"
            >
              {showConfirmPassword ? <Eye /> : <ClosedEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              t("save")
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewPasswordForm;
