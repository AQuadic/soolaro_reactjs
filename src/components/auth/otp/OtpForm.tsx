import { useState, useEffect } from "react";
import Logo from "@/components/icons/header/Logo";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link, useNavigate } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { verifyOtp, resendOtp } from "@/lib/api/auth";
import { usePasswordResetStore } from "@/store/usePasswordResetStore";
import { getErrorMessage } from "@/lib/utils/auth";

const OtpForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { email, setResetToken, setStep } = usePasswordResetStore();

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if no email in store (user came directly to OTP page)
  useEffect(() => {
    if (!email) {
      navigate("/forget_password", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setError(null);
    try {
      await resendOtp(email);
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (otp.length !== 6) {
      setError(t("errors.otp_required", "Please enter the 6-digit code"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtp({
        email,
        otp,
      });

      // Store reset token from the API response
      if (response.reset_token) {
        setResetToken(response.reset_token);
      }

      // Update step
      setStep("reset");

      // Navigate to new password page
      navigate("/new_password");
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
        <h2 className="text-[#0B0B0B] md:text-[40px] text-2xl font-bold md:font-semibold leading-[100%] mx-auto text-center">
          {t("verify_account")}
        </h2>

        <p className="text-[#3B3B3B] md:text-base text-sm font-medium md:mt-6 mt-4 text-center">
          {t("otp_sent")}
        </p>

        {email && (
          <p className="text-[#018884] text-sm font-medium mt-2 text-center">
            {email}
          </p>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="md:mt-20 mt-12 flex items-center justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
            >
              <InputOTPGroup className="gap-2">
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="md:w-20 w-10 md:h-20 h-10 rounded-4xl border-gray-300 first:rounded-4xl last:rounded-4xl"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="md:mt-10 mt-6 w-full md:h-14 h-12 bg-[#018884] rounded-4xl text-[#FEFEFE] text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              t("verify")
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={!canResend || isResending}
            className={`text-sm font-medium ${
              canResend && !isResending
                ? "text-[#018884]"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            {isResending ? (
              <Loader2 className="h-4 w-4 animate-spin inline" />
            ) : canResend ? (
              t("resend_code")
            ) : (
              `${t("resend_code_in")} ${timer}s`
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default OtpForm;
