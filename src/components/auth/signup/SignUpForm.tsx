// import Apple from "@/components/icons/auth/Apple";
import ClosedEye from "@/components/icons/auth/ClosedEye";
// import Facebook from "@/components/icons/auth/Facebook";
// import Google from "@/components/icons/auth/Google";
import Logo from "@/components/icons/header/Logo";
import { Link, useNavigate } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";
import { PhoneInput, type PhoneValue } from "@/components/ui/PhoneInput";
import { useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import { register } from "@/lib/api/auth";
import { setToken } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { getErrorMessage } from "@/lib/utils/auth";

const SignUpForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    phone: PhoneValue | string;
    email: string;
    password: string;
    password_confirmation: string;
  }>({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onChange = (
    field: "name" | "phone" | "email" | "password" | "password_confirmation",
    value: string | PhoneValue,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError(t("errors.name_required", "Name is required"));
      return;
    }
    if (!formData.email.trim()) {
      setError(t("errors.email_required", "Email is required"));
      return;
    }
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
      // Build phone string and country if provided
      const phone =
        typeof formData.phone === "object" && formData.phone.number
          ? formData.phone.number
          : undefined;

      const phone_country =
        typeof formData.phone === "object" && formData.phone.code
          ? formData.phone.code
          : undefined;

      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        phone,
        phone_country,
      });

      // Store token
      setToken(response.token);

      // Update auth store with user data
      setUser(response.user);

      // Navigate to home
      navigate("/", { replace: true });
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

      <div className="md:mt-15 mt-8">
        <MobileBackHeader title={t("sign_up_to_account")} />
        <h2 className="hidden md:block text-[#0B0B0B] text-[40px] font-semibold leading-[100%] mx-auto mb-14.5">
          {t("sign_up_to_account")}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="md:mt-14.5 mt-8">
            <label
              htmlFor="name"
              className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
            >
              {t("name")}
            </label>
            <input
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              type="text"
              name="name"
              className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
              placeholder={t("enter_name")}
              disabled={isLoading}
            />
          </div>

          <div className="mt-8">
            <label
              htmlFor="phone"
              className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
            >
              {t("phone_number")}
            </label>
            <PhoneInput
              value={formData.phone as PhoneValue}
              onChange={(value) => onChange("phone", value)}
              radius="md"
              className="h-12 md:h-14 rounded-[20px] border-[#DEDDDD] mt-3"
              disabled={isLoading}
            />
          </div>

          <div className="mt-8">
            <label
              htmlFor="email"
              className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
            >
              {t("email")}
            </label>
            <input
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              type="email"
              name="email"
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
              value={formData.password}
              onChange={(e) => onChange("password", e.target.value)}
              type={showPassword ? "text" : "password"}
              name="password"
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

          <div className="mt-8 relative">
            <label
              htmlFor="password_confirmation"
              className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
            >
              {t("confirm_new_password")}
            </label>
            <input
              value={formData.password_confirmation}
              onChange={(e) =>
                onChange("password_confirmation", e.target.value)
              }
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
              placeholder={t("enter_password")}
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

          {/* Social Login - Hidden for now */}
          {/* <div className="mt-6 flex items-center gap-2">
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
              t("sign_up")
            )}
          </button>
        </form>

        <div className="md:mt-4 mt-3 flex items-center justify-center">
          <p className="text-[#0B0B0B] md:text-base text-xs font-medium">
            {t("already_have_account")}{" "}
            <Link
              to="/signin"
              className="text-[#018884] md:text-lg text-base font-bold"
            >
              {t("sign_in")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
