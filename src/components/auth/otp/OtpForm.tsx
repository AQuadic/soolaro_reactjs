import { useState, useEffect } from "react";
import Logo from "@/components/icons/header/Logo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";

const OtpForm = () => {
  const { t } = useTranslation("auth");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

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

  const handleResend = () => {
    console.log("Resend OTP");
    setTimer(60);
    setCanResend(false);
  };

  return (
    <section className="container md:py-12">
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

        <div className="md:mt-20 mt-12 flex items-center justify-center">
          <InputOTP maxLength={6}>
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

        <Dialog>
          <DialogTrigger className="w-full">
            <button className="md:mt-10 mt-6 w-full md:h-14 h-12 bg-[#018884] rounded-4xl text-[#FEFEFE] text-lg font-bold">
              {t("verify")}
            </button>
          </DialogTrigger>
          <DialogContent className="md:w-[655px] w-full md:h-121.25 h-80 flex flex-col items-center justify-end">
            <DialogHeader>
              <DialogTitle className="text-[#0B0B0B] text-2xl font-semibold text-center">
                {t("otp_verified")}
              </DialogTitle>
              <DialogDescription className="text-[#0B0B0B] text-base font-medium mt-3 text-center">
                {t("create_new_password")}
              </DialogDescription>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Link
                    to="/new_password"
                    type="button"
                    className="md:w-112.5 h-14 bg-[#018884] rounded-4xl mt-10 text-[#FEFEFE] text-base font-bold flex items-center justify-center"
                  >
                    {t("create_new_password_btn")}
                  </Link>
                </DialogClose>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`text-sm font-medium ${
              canResend ? "text-[#018884]" : "text-gray-400 cursor-not-allowed"
            }`}
          >
            {canResend ? t("resend_code") : `${t("resend_code_in")} ${timer}s`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default OtpForm;
