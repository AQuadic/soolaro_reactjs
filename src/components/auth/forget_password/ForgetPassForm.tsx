import Logo from "@/components/icons/header/Logo";
import { Link, useNavigate } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { forgotPassword } from "@/lib/api/auth";
import { usePasswordResetStore } from "@/store/usePasswordResetStore";
import { getErrorMessage } from "@/lib/utils/auth";

const ForgetPassForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { setEmail, setStep } = usePasswordResetStore();

  const [email, setEmailLocal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email.trim()) {
      setError(t("errors.email_required", "Email is required"));
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);

      // Store email in password reset store for OTP and reset steps
      setEmail(email);
      setStep("verify");

      // Navigate to OTP page
      navigate("/otp");
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
        <MobileBackHeader onBack={() => navigate(-1)} />
        <h2 className="text-[#0B0B0B] md:text-[40px] text-2xl font-bold md:font-semibold leading-[100%] text-center mx-auto mt-6">
          {t("forget_password")}
        </h2>
        <p className="text-[#3B3B3B] text-base font-medium leading-[150%] mt-6 text-center">
          {t("forget_password_desc")}
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
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
              value={email}
              onChange={(e) => setEmailLocal(e.target.value)}
              className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
              placeholder={t("enter_email")}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              t("send")
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassForm;
